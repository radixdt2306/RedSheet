using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RedSheet.Models.Models;
using RedSheet.ViewModels.Models;
using RedSheet.BoundedContext.SqlContext;
using Rx.Core.Data;
using Rx.Core.Settings;
using System.IO;

using System.Net.Mail;


namespace RedSheet.Api.Controllers.Api.EmailTransaction
{
    [Route("api/[controller]")]
    
    public class EmailTransactionController : ControllerBase
    {
        private ServerSetting ServerSetting { get; set; }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public EmailTransactionController(IDbContextManager<MainSqlDbContext> dbContextManager , ServerSetting serverSetting)
        {
            DbContextManager = dbContextManager;
            ServerSetting = serverSetting;
        }

        [HttpPost]
        [Route("NewMessage")]
        public async Task<IActionResult> NewMessageToUsers([FromBody] EmailTransactionNewMessage transactionNewMessage)
        {
            bool isSent = false;
            bool ismail = false;
            try
            {
                if (transactionNewMessage.IsSend == true)
                {
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient(ServerSetting.Get<string>("emailSettings.MailServer"));

                    mail.From = new MailAddress(transactionNewMessage.EmailFrom);
                    foreach(var email in transactionNewMessage.EmailTo)
                    {
                        mail.To.Add(email);
                    }
                    mail.Subject = transactionNewMessage.EmailSubject.ToString();
                    //mail.IsBodyHtml = true;
                    mail.Body = transactionNewMessage.EmailMessage;

                    SmtpServer.Port = Convert.ToInt32(ServerSetting.Get<string>("emailSettings.Port"));
                    var credential = new System.Net.NetworkCredential();
                    credential.UserName = ServerSetting.Get<string>("emailSettings.UserName"); //
                    credential.Password = ServerSetting.Get<string>("emailSettings.PassWord"); //
                    SmtpServer.Credentials = credential;
                    SmtpServer.EnableSsl = true;

                    //await SmtpServer.SendMailAsync(mail);
                    ismail = true;
                }

                string emailsTo = "";
                emailsTo = String.Join(",",transactionNewMessage.EmailTo);

                var spParameters = new object[11];

                spParameters[1] = new SqlParameter() { ParameterName = "projectId", Value = transactionNewMessage.ProjectId };
                spParameters[2] = new SqlParameter() { ParameterName = "projectModuleId", Value = transactionNewMessage.ProjectModuleId };
                spParameters[3] = new SqlParameter() { ParameterName = "to", Value = emailsTo };
                spParameters[4] = new SqlParameter() { ParameterName = "from", Value = transactionNewMessage.EmailFrom };
                spParameters[5] = new SqlParameter() { ParameterName = "subject", Value = transactionNewMessage.EmailSubject };
                spParameters[6] = new SqlParameter() { ParameterName = "message", Value = transactionNewMessage.EmailMessage };
                spParameters[7] = new SqlParameter() { ParameterName = "status", Value = transactionNewMessage.EmailStatus };
                spParameters[8] = new SqlParameter() { ParameterName = "isSystem", Value = transactionNewMessage.IsSystemGenerated };
                spParameters[9] = new SqlParameter() { ParameterName = "user", Value = transactionNewMessage.UserId };
                spParameters[10] = new SqlParameter() { ParameterName = "updateBy", Value = transactionNewMessage.UpdatedBy };

                var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.NewEmailMessage @projectId , @projectModuleId , @to , @from , @subject , @message , @status , @isSystem , @user , @updateBy ", spParameters); // change ' dbo.spEmailTransaction ' to ' dbo.spEmailTransactions '
                var response = storeProcSearchResult.SingleOrDefault()?.Result;

                if (response == "TRUE")
                {
                    isSent = true;
                }

            }
            catch (Exception ex)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/EmailLogs/ErrorLogs.txt");
                System.IO.File.AppendAllText(path, ex.Message + Environment.NewLine);

            }

            if (isSent == true)
            {
                return Ok(new { store = isSent, sent = ismail });
            }
            else
            {
                return BadRequest(new { store = isSent, sent = ismail });
            }
        }


        [HttpPost]
        [Route("Reply")]
        public async Task<IActionResult> MessageReply([FromBody] EmailTransactionsReply emailTransactions)
        {
            bool isSent = false;
            bool ismail = false;
            try
            {
                if (emailTransactions.IsSend == true)
                {
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient(ServerSetting.Get<string>("emailSettings.MailServer"));

                    mail.From = new MailAddress(emailTransactions.EmailFrom);
                    mail.To.Add(emailTransactions.EmailTo);
                    mail.Subject = emailTransactions.EmailSubject.ToString();
                    //mail.IsBodyHtml = true;
                    mail.Body = emailTransactions.EmailMessage;

                    SmtpServer.Port = Convert.ToInt32(ServerSetting.Get<string>("emailSettings.Port"));
                    var credential = new System.Net.NetworkCredential();
                    credential.UserName = ServerSetting.Get<string>("emailSettings.UserName"); //
                    credential.Password = ServerSetting.Get<string>("emailSettings.PassWord"); //
                    SmtpServer.Credentials = credential;
                    SmtpServer.EnableSsl = true;

                    //await SmtpServer.SendMailAsync(mail);
                    ismail = true;
                }

                var spParameters = new object[11];
                spParameters[0] = new SqlParameter() { ParameterName = "emailId", Value = emailTransactions.EmailTransactionId };
                spParameters[1] = new SqlParameter() { ParameterName = "projectId", Value = emailTransactions.ProjectId };
                spParameters[2] = new SqlParameter() { ParameterName = "projectModuleId", Value = emailTransactions.ProjectModuleId };
                spParameters[3] = new SqlParameter() { ParameterName = "to", Value = emailTransactions.EmailTo };
                spParameters[4] = new SqlParameter() { ParameterName = "from", Value = emailTransactions.EmailFrom };
                spParameters[5] = new SqlParameter() { ParameterName = "subject", Value = emailTransactions.EmailSubject };
                spParameters[6] = new SqlParameter() { ParameterName = "message", Value = emailTransactions.EmailMessage };
                spParameters[7] = new SqlParameter() { ParameterName = "status", Value = emailTransactions.EmailStatus };
                spParameters[8] = new SqlParameter() { ParameterName = "isSystem", Value = emailTransactions.IsSystemGenerated };
                spParameters[9] = new SqlParameter() { ParameterName = "user", Value = emailTransactions.UserId };
                spParameters[10] = new SqlParameter() { ParameterName = "updateBy", Value = emailTransactions.UpdatedBy };

                var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.EmailMessageReply @emailId , @projectId , @projectModuleId , @to , @from , @subject , @message , @status , @isSystem , @user , @updateBy ", spParameters); // change ' dbo.spEmailTransaction ' to ' dbo.spEmailTransactions '
                var response = storeProcSearchResult.SingleOrDefault()?.Result;
                
                if ( response == "TRUE")
                {
                    isSent = true;
                }

            }
            catch(Exception ex)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/EmailLogs/ErrorLogs.txt");
                System.IO.File.AppendAllText(path, ex.Message + Environment.NewLine);
                
            }

            if(isSent==true)
            {
                return Ok(new { store = isSent , sent = ismail });
            }
            else
            {
                return BadRequest(new { store = isSent, sent = ismail });
            }

        }
    }
}
