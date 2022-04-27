using RedSheet.DbEntities.Constants;
using RedSheet.DbEntities.Enums;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Security;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace RedSheet.Domain.Users
{
    public class UserDomain : IUserDomain
    {
        public UserDomain(IUserUow userUow, IMasterUow masterUow, IPasswordHash passwordHash, IApplicationUtility applicationUtility)
        {
            UserUow = userUow;
            MasterUow = masterUow;
            PasswordHash = passwordHash;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }
        public User Add(User user)
        {
            //var passwordHash = this.PasswordHash.Encrypt(user.UserPassword);
            //user.Password = passwordHash.Signature;
            //user.Salt = passwordHash.Salt;
            //user.IsFirstTimeLogin = true;
            // user.PasswordUpdationDateTime = DateTimeOffset.UtcNow; //To be discussed
            UserUow.RegisterNew<User>(user);
            UserUow.Commit();
            return user;
        }

        public HashSet<string> AddValidation(User user)
        {

            //if (!user.UserPassword.Equals(user.ConfirmPassword))
            //{
            //    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.notMatchedPassword, true));
            //}
            //CheckPasswordPolicy(user);
            ValidationMessages.Clear();
            var userObject = UserUow.Repository<User>().SingleOrDefault(t => t.Email == user.Email && t.StatusId != Status.Deleted);
            if (userObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        private void CheckPasswordPolicy(User user)
        {
            var passwordPolicy = MasterUow.Repository<PasswordPolicy>().All().FirstOrDefault();
            if (passwordPolicy != null)
            {
                if (user.UserPassword.Length < passwordPolicy.MinimumNumberOfCharacters)
                {
                    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.minimumNoOfCharacterPassword, true));
                }
                if (passwordPolicy.ForcePasswordAlphaNum)
                {
                    var forcePassword = new Regex(RegexConstants.AlphaNumericAndSpecialChars);
                    var forcePasswordMatchString = forcePassword.IsMatch(user.UserPassword);
                    if (!forcePasswordMatchString)
                    {
                        ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.forcePasswordAlphaNum, true));
                    }
                }
            }
        }
        public void Delete(int id)
        {
            var user = UserUow.Repository<User>().FindByKey(id);
            user.StatusId = Status.Deleted;
            UserUow.RegisterDirty<User>(user);
            UserUow.Commit();
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<User>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public User Update(User user)
        {
            if (user.IsChangePassword)
            {
                var passwordHash = this.PasswordHash.Encrypt(user.UserPassword);
                user.Password = passwordHash.Signature;
                user.Salt = passwordHash.Salt;
                // user.PasswordUpdationDateTime = DateTimeOffset.UtcNow; // To be discussed
            }
            user.IsFirstTimeLogin = true;
            user.StatusId = Status.Active;
            UserUow.RegisterDirty<User>(user);
            UserUow.Commit();
            return user;
        }

        public HashSet<string> UpdateValidation(User user)
        {
            if (user.IsChangePassword)
            {
                if (!user.UserPassword.Equals(user.ConfirmPassword))
                {
                    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.notMatchedPassword, true));
                }
                CheckPasswordPolicy(user);
            }
            var userObject = UserUow.Repository<User>().SingleOrDefault(t => t.Email == user.Email && t.UserId != user.UserId && t.StatusId != Status.Deleted);
            if (userObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IUserUow UserUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        private IPasswordHash PasswordHash { get; set; }
    }

    public interface IUserDomain
    {
        HashSet<string> AddValidation(User user);
        HashSet<string> UpdateValidation(User user);
        HashSet<string> DeleteValidation(int id);
        User Add(User user);
        User Update(User user);
        void Delete(int id);
    }
}
