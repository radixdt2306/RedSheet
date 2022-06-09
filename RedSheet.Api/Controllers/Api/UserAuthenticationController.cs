using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RedSheet.Api.Constants;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Authorization;
using RedSheet.Infrastructure.Security;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Security.Jwt;
using System;
//using System.Runtime.Serialization.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using System.Net;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using RedSheet.DbEntities.Constants;
using RedSheet.Domain.ClientServiceModule;
using RedSheet.Domain.MemberShipService;
using Rx.Core.Settings;
using RedSheet.Domain.Users;
using RedSheet.DbEntities.Enums;
using System.Threading.Tasks;
using System.Data.SqlClient;
using RedSheet.BoundedContext.SqlContext;
using Rx.Core.Data;
//using RedSheet.Domain.MemberShipService;

namespace RedSheet.Api.Controllers
{

    public class UserAuthenticationController : BaseController
    {

        private Domain.Users.IUserDomain UserDomain { get; set; }

        public IConfiguration configuration;

        private IUserAuthorization UserAuthorization { get; set; }

        private ITokenProvider TokenProvider { get; set; }

        private ILoginUow LoginUow { get; set; }

        private IPasswordHash PasswordHash { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private ServerSetting ServerSetting { get; set; }

        private IDbContextManager<MainSqlDbContext> _DbContextManager { get; set; }

        public UserAuthenticationController(ITokenProvider tokenProvider, ILoginUow loginUow, IUserAuthorization userAuthorization,
            IConfiguration configuration, IPasswordHash passwordHash, IApplicationUtility applicationUtility,
            ClientServiceContext clientServiceContext, ServerSetting serverSetting, IUserDomain userDomain, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            TokenProvider = tokenProvider;
            UserAuthorization = userAuthorization;
            this.configuration = configuration;
            this.LoginUow = loginUow;
            this.PasswordHash = passwordHash;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            this.ClientServiceContext = clientServiceContext;
            this.ServerSetting = serverSetting;
            UserDomain = userDomain;
            _DbContextManager = dbContextManager;
        }

        [HttpPost]
        [Route("api/[controller]/login")]

        public IActionResult PostLogin([FromBody] UserCredentialViewModel userCredential, string uid, string trg, string ssoKey,string authToken)
        {
            bool isSSOLogin = false;
            LoginResult loginResult = new LoginResult();
            UserAuthenticationViewModel userAuthentication = new UserAuthenticationViewModel();
            if (!string.IsNullOrEmpty(uid) && !string.IsNullOrEmpty(trg) && !string.IsNullOrEmpty(ssoKey))
            {
                userCredential = new UserCredentialViewModel();
                if (trg == new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString()) //RedSheetServiceConfiguration.ApplicationId.ToString())
                {
                    isSSOLogin = true;

                    SSOAuthenticationResult ssoAuthenticationResult = this.ClientServiceContext.AuthenticateSSORequest(uid, trg, ssoKey);

                    if (ssoAuthenticationResult.IsAuthenticated)
                    {
                        userCredential.UserName = ssoAuthenticationResult.UserEmail;
                        loginResult.Authenticated = true;
                        loginResult.UserUniqueId = uid;
                        loginResult.UserDataSynchronizationRequired = false;
                        userAuthentication.AcademyUrl = ssoAuthenticationResult.RequestApplicationReturnUrl;
                    }
                    else
                    {
                        userAuthentication.FailedLogin = true;
                        userAuthentication.FailedCount = userCredential.FailedCount;
                        userAuthentication.ValidationMessage = ssoAuthenticationResult.ErrorMessage;
                        return BadRequest(userAuthentication);
                    }
                }
                else
                {
                    userAuthentication.FailedLogin = true;
                    userAuthentication.FailedCount = userCredential.FailedCount;
                    userAuthentication.ValidationMessage = "Login attempt failed";
                    return BadRequest(userAuthentication);
                }

            }

            if (!isSSOLogin)
            {
                var userMemberShip = new MembershipModel
                {
                    Email = userCredential.UserName,
                    Password = userCredential.Password,
                    ApplicationID = new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString()
                };
                loginResult = this.ClientServiceContext.UserLogin(userMemberShip);
            }

            if (loginResult.Authenticated)
            {
                //var user = this.LoginUow.Repository<User>().SingleOrDefault(t => t.Email == userCredential.UserName && t.StatusId == DbEntities.Enums.Status.Active);
                var guid = new Guid(loginResult.UserUniqueId);
                var user = this.LoginUow.Repository<User>().SingleOrDefault(t => t.RequestorId == new Guid(loginResult.UserUniqueId) && t.StatusId == DbEntities.Enums.Status.Active);
                
                if (user == null)
                {
                    //GetCompanyUsers 
                    UserProfileModel userProfileModel = new UserProfileModel();
                    userProfileModel = this.ClientServiceContext.GetUserProfile(userCredential.UserName);

                    userProfileModel.UserTypeId = this.ClientServiceContext.GetUserProfileFromUniqueId(userProfileModel.UniqueIdentity).UserTypeId;

                    user = newUser(userProfileModel, true);
                    if (user != null)
                    {
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, (user.UserId).ToString()),
                            new Claim(ClaimTypes.Email, userCredential.UserName),
                            new Claim(ClaimTypes.Role, (1).ToString()),                            
                            //new Claim(ClaimTypes.Locality, (applicationTimeZone.ApplicationTimeZoneId).ToString()),
                            new Claim(ClaimTypes.System, "RXDOTNET4\\MSSQLSERVER2016"),
                            new Claim(ClaimTypes.GivenName, "RedSheetweb"),
                            new Claim(ClaimTypes.GroupSid, 1.ToString()),
                            new Claim(ClaimTypes.UserData,"1"),
                              new Claim(ClaimTypes.PrimarySid, loginResult.UserUniqueId)
                        };
                        var jwt = TokenProvider.WriteToken(claims, "TEST", "FRONT");
                        string fullName = string.Format("{0}", userCredential.UserName);
                        userAuthentication.Token = jwt;
                        userAuthentication.Modules = UserAuthorization.GetAccessModules(0, 1);
                        userAuthentication.UserName = userCredential.UserName;
                        userAuthentication.FullName = fullName;
                        userAuthentication.RoleId = 1;
                        userAuthentication.DateData = DateTime.UtcNow;
                        userAuthentication.FailedLogin = false;
                        userAuthentication.FailedCount = userCredential.FailedCount;
                        userAuthentication.UserId = user.UserId;
                        userAuthentication.UserTypeId = userProfileModel.UserTypeId;
                    }
                }
                else
                {
                    UserProfileModel userProfileModelForUserTypeId = new UserProfileModel();
                    userProfileModelForUserTypeId = this.ClientServiceContext.GetUserProfile(userCredential.UserName);
                    userProfileModelForUserTypeId.UserTypeId = this.ClientServiceContext.GetUserProfileFromUniqueId(userProfileModelForUserTypeId.UniqueIdentity).UserTypeId;

                    var claims = new[]
                            {
                            new Claim(ClaimTypes.NameIdentifier, (user.UserId).ToString()),
                            new Claim(ClaimTypes.Email, userCredential.UserName),
                            new Claim(ClaimTypes.Role, (1).ToString()),
                            //new Claim(ClaimTypes.Locality, (applicationTimeZone.ApplicationTimeZoneId).ToString()),
                            new Claim(ClaimTypes.System, "RXDOTNET4\\MSSQLSERVER2016"),
                            new Claim(ClaimTypes.GivenName, "RedSheetweb"),
                            new Claim(ClaimTypes.GroupSid, 1.ToString()),
                            new Claim(ClaimTypes.UserData,"1"),
                              new Claim(ClaimTypes.PrimarySid, loginResult.UserUniqueId)
                        };

                    var jwt = TokenProvider.WriteToken(claims, "TEST", "FRONT");
                    string fullName = string.Format("{0}", userCredential.UserName);
                    userAuthentication.Token = jwt;
                    userAuthentication.Modules = UserAuthorization.GetAccessModules(0, 1);
                    userAuthentication.UserName = userCredential.UserName;
                    userAuthentication.FullName = fullName;
                    userAuthentication.RoleId = 1;
                    userAuthentication.DateData = DateTime.UtcNow;
                    userAuthentication.FailedLogin = false;
                    userAuthentication.FailedCount = userCredential.FailedCount;
                    userAuthentication.UserId = user.UserId;
                    userAuthentication.UserTypeId = userProfileModelForUserTypeId.UserTypeId;
                }
                if (loginResult.UserDataSynchronizationRequired)
                {
                    var lstDbUsers = this.LoginUow.Repository<User>().All().Where(t => t.CompanyId == user.CompanyId && t.StatusId == DbEntities.Enums.Status.Active).ToList();

                    //Task.Run(() =>
                    //{
                    Workflow_User[] users_company = this.ClientServiceContext.Workflow_GetApplicationUsers(new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString(), user.RequestorId.ToString());
                    if (users_company.Count() > 0)
                    {
                        //update data
                        for (int i = 0; i < lstDbUsers.Count(); i++)
                        {
                            User appUser = lstDbUsers[i];
                            UserProfileModel workflowUser = this.ClientServiceContext.GetUserProfileFromUniqueId(appUser.RequestorId.ToString());
                            if (workflowUser.Archived != null)
                            {
                                //Delete removed user from Membership API.
                                UserDomain.Delete(appUser.UserId);
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(workflowUser.Forename))
                                {
                                    if ((appUser.FirstName != workflowUser.Forename) || (appUser.LastName != workflowUser.Surname) ||
                                        (appUser.Email != workflowUser.Email) || (appUser.Office != workflowUser.Position) ||
                                        (appUser.Initial != workflowUser.Forename[0].ToString()) ||
                                        (appUser.CompanyId != new Guid(workflowUser.CompanyGUID)))
                                    {
                                        appUser.FirstName = workflowUser.Forename;
                                        appUser.LastName = workflowUser.Surname;
                                        appUser.Email = workflowUser.Email;
                                        appUser.Office = workflowUser.Position;
                                        appUser.Initial = workflowUser.Forename[0].ToString();
                                        appUser.IsChangePassword = false;
                                        appUser.IsFirstTimeLogin = false;
                                        appUser.CompanyId = new Guid(workflowUser.CompanyGUID);
                                        UserDomain.Update(appUser);
                                    }
                                }
                            }

                        }

                        // add missing user in DB.
                        var newUsers = users_company.ToList().Where(p1 => !(lstDbUsers.Any(p2 => p1.UniqueId.ToLower() == p2.RequestorId.ToString().ToLower()))).ToList();
                        for (int i = 0; i < newUsers.Count(); i++)
                        {
                            UserProfileModel userProfileModel = new UserProfileModel();
                            userProfileModel = this.ClientServiceContext.GetUserProfile(newUsers[i].Email);
                            user = newUser(userProfileModel, false);
                        }

                        ////Delete removed user from Membership API.
                        //var archivedUsers = lstDbUsers.ToList().Where(p1 => !(users_company.Any(p2 => p1.Email != p2.Email.ToLower()))).ToList();
                        //for (int i = 0; i < archivedUsers.Count(); i++)
                        //{
                        //    UserDomain.Delete(archivedUsers[i].UserId);
                        //}
                    }

                    // Session stuff

                    ClientServiceContext.ServiceApplication_UpdateDataSynchronizedDate(loginResult.UserUniqueId, new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString());
                }
                //});

                return Ok(userAuthentication);

            }
            else
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.FailedCount = userCredential.FailedCount;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.InvalidUserNamePassword, true);
                return BadRequest(userAuthentication);
            }

        }

        

        private User newUser(UserProfileModel userProfileModel, bool isFirstTimeLogin)
        {
            User newUser = new User();
            newUser.UserName = userProfileModel.Forename;
            newUser.FirstName = userProfileModel.Forename;
            newUser.LastName = userProfileModel.Surname;
            newUser.Email = userProfileModel.Email;
            newUser.Office = userProfileModel.Position;
            newUser.Initial = userProfileModel.Forename[0].ToString();
            newUser.StatusId = Status.Active;
            newUser.CompanyId = new Guid(userProfileModel.CompanyGUID);
            newUser.RequestorId = new Guid(userProfileModel.UniqueIdentity);
            newUser.IsFirstTimeLogin = isFirstTimeLogin;
            var validations = UserDomain.AddValidation(newUser);

            if (validations.Count == 0)
            {
                var result = UserDomain.Add(newUser);
                return result;
            }
            return null;
        }


        [HttpPost, Route("api/[controller]/forgotpassword")]
        public IActionResult PostForgotPassword([FromBody] UserCredentialViewModel userCredential)
        {

            UserAuthenticationViewModel userAuthentication = new UserAuthenticationViewModel();
            if (!Regex.IsMatch(userCredential.UserName,
                      @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                      @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                      RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250)))
            {


                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.InvalidEmailFormat, true);
                return BadRequest(userAuthentication);
            }

            ResetPasswordRequestModel resetPasswordRequestModel = new ResetPasswordRequestModel();
            resetPasswordRequestModel.ApplicationID = new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString();
            resetPasswordRequestModel.EmailAddress = userCredential.UserName;
            resetPasswordRequestModel.ReturnUrl = this.ServerSetting.Get<string>("applicationUrl.clientUrl") + "reset-password";
            var dicObject = this.ClientServiceContext.RequestPasswordReset(resetPasswordRequestModel);

            if (dicObject.ContainsKey(1))
            {
                userAuthentication.FailedLogin = false;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.emailSent, true);
                return Ok(userAuthentication);
            }
            else if (dicObject.ContainsKey(-1))
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.unexpectedErrorContactSupport, true);
                return BadRequest(userAuthentication);
            }
            else if (dicObject.ContainsKey(-2))
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.unexpectedError, true);
                return BadRequest(userAuthentication);
            }
            return Ok();


            //var securityQuestion = this.LoginUow.Repository<vSecurityAnswer>().SingleOrDefault(t => t.UserName.ToLower() == userCredential.UserName.ToLower());
            //if (securityQuestion != null)
            //{
            //    return Ok(securityQuestion);
            //}
            //return NotFound(ApplicationUtility.GetValidationMessage(ValidationFailedCode.NotCorrectUserName, true));
        }

        [HttpPost, Route("api/[controller]/verification")]
        public IActionResult PostVerification([FromBody] SecurityVerificationViewModel verification)
        {
            var securityAnswer = this.LoginUow.Repository<vSecurityAnswer>().SingleOrDefault(t => t.UserName.ToLower() == verification.UserName.ToLower() && t.SecurityQuestionName.ToLower() == verification.SecurityQuestion.ToLower() && t.SecurityAnswer.ToLower() == verification.SecurityAnswer.ToLower());
            if (securityAnswer != null)
            {
                var verficationCode = Guid.NewGuid();
                var user = this.LoginUow.Repository<User>().FindByKey(securityAnswer.UserId);
                if (user != null)
                {
                    user.VerificationCode = verficationCode;
                    this.LoginUow.RegisterDirty<User>(user);
                    this.LoginUow.Commit();
                    return Ok(verficationCode);
                }
            }
            return NotFound(ApplicationUtility.GetValidationMessage(ValidationFailedCode.NotCorrectSecurityQuestionOrAnswer, true));
        }

        [HttpPut, Route("api/[controller]/credential")]
        public IActionResult PutCredential([FromBody] ChangeCredentialViewModel changeCredential)
        {
            UserAuthenticationViewModel userAuthentication = new UserAuthenticationViewModel();

            ResetPasswordModel resetPasswordModel = new ResetPasswordModel();
            resetPasswordModel.EmailAddress = changeCredential.UserName;
            resetPasswordModel.EmailToken = changeCredential.VerificationCode.ToString();
            resetPasswordModel.NewPassword = changeCredential.Password;
            var dicObject = this.ClientServiceContext.ResetPassword(resetPasswordModel);

            if (dicObject.ContainsKey(1))
            {
                userAuthentication.FailedLogin = false;
                return Ok(userAuthentication);

            }
            else if (dicObject.ContainsKey(-1))
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.notAllParamsPopulated, true);
                return BadRequest(userAuthentication);

            }
            else if (dicObject.ContainsKey(-2))
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.accountNotFoundContactSupport, true);
                return BadRequest(userAuthentication);
            }
            else if (dicObject.ContainsKey(-4))
            {
                userAuthentication.FailedLogin = true;
                userAuthentication.ValidationMessage = ApplicationUtility.GetValidationMessage(ValidationFailedCode.tokenExpireMakeRequest, true);
                return BadRequest(userAuthentication);
            }

            return Ok();
        }

        [HttpPost, Route("api/[controller]/" + ApplicationConstants.USERS_PROJECT_METRICS)]
        public async Task<IActionResult> UserProjectMetrics(int userId)
        {
            try
            {
                var spParameters = new object[1];
                spParameters[0] = new SqlParameter() { ParameterName = "UserId", Value = userId };

                var storeProcSearchResult = await _DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spUserProjectMetrics @UserId", spParameters);

                return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }

        [HttpPost, Route("api/[controller]/" + ApplicationConstants.COMPANY_METRICS_OVERVIEW)]
        public async Task<IActionResult> CompanyMetricsOverview(Guid companyId)
        {
            try
            {
                var spParameters = new object[1];
                spParameters[0] = new SqlParameter() { ParameterName = "CompanyId", Value = companyId };

                var storeProcSearchResult = await _DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spCompanyMetricsOverview @CompanyId", spParameters);

                return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }
    }
}