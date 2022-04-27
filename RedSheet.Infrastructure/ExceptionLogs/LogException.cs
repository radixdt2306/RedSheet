using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using Rx.Core.Security;
using System;

namespace RedSheet.Infrastructure.ExceptionLogs
{
    public class LogException : ILogException
    {
        private IExceptionUow Uow { get; set; }
        public LogException(IExceptionUow exceptionUow) {
            Uow = exceptionUow;
        }

        private string DatabaseLog(Exception exception, string uri)
        {
                
                var applicationExceptionLog = new ApplicationExceptionLog
                {
                    Url = uri,
                    Message = exception.Message.ToString(),
                    ExceptionType = exception.GetType().ToString(),
                    ExceptionSource = exception.Source ?? string.Empty,
                    StackTrace = exception.StackTrace,
                    InnerException = (exception.InnerException != null) ? Convert.ToString(exception.InnerException) : string.Empty,
                    ExceptionDate = DateTime.UtcNow,
                    UserId = UserClaim.UserId 
                };

                Uow.RegisterNew<ApplicationExceptionLog>(applicationExceptionLog);
                Uow.Commit();
                return string.Format("User : {0}<br/> Date & Time : {1}<br/> Error Log Id : {2}",
                    UserClaim.UserId,
                    DateTime.Now.ToString(),
                    applicationExceptionLog.ApplicationExceptionLogId.ToString());
            
        }

        public string Log(Exception exception, string uri)
        {
            return DatabaseLog(exception,uri);
        }
    }

    public interface ILogException {
        string Log(Exception exception,string uri);
    }
}
