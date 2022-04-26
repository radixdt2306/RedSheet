using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ScheduleEmailsModule
{
    public class ScheduleEmailDomain : IScheduleEmailDomain
    {
        public ScheduleEmailDomain(IScheduleEmailUow scheduleEmailsUow, IApplicationUtility applicationUtility)
        {
            ScheduleEmailsUow = scheduleEmailsUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<ScheduleEmail> Get() => ScheduleEmailsUow.Repository<ScheduleEmail>().All();

        public ScheduleEmail  Get(int id)   => ScheduleEmailsUow.Repository<ScheduleEmail>().SingleOrDefault(t => t.ScheduleEmailId == id);

        public HashSet<string> AddValidation(ScheduleEmail scheduleEmail)
        {
            CommonValidation(scheduleEmail);
            return ValidationMessages;
        }

        public ScheduleEmail Add(ScheduleEmail scheduleEmail)
        {
            ScheduleEmailsUow.RegisterNew<ScheduleEmail>(scheduleEmail);
            ScheduleEmailsUow.Commit();
            return scheduleEmail;
        }
        public HashSet<string> UpdateValidation(ScheduleEmail scheduleEmail)
        {
			CommonValidation(scheduleEmail);
           return ValidationMessages;
        }

        public ScheduleEmail Update(ScheduleEmail scheduleEmail)
        {
            ScheduleEmailsUow.RegisterDirty<ScheduleEmail>(scheduleEmail);
            ScheduleEmailsUow.Commit();
            return scheduleEmail;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<ScheduleEmail>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,false));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var scheduleEmail = ScheduleEmailsUow.Repository<ScheduleEmail>().FindByKey(id);
            ScheduleEmailsUow.RegisterDeleted<ScheduleEmail>(scheduleEmail);
            ScheduleEmailsUow.Commit();
        }
 
		private void CommonValidation(ScheduleEmail scheduleEmail) {
        
		}

        private IScheduleEmailUow ScheduleEmailsUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface IScheduleEmailDomain
    {
		IEnumerable<ScheduleEmail> Get();
		ScheduleEmail  Get(int id)  ;
        HashSet<string> AddValidation(ScheduleEmail scheduleEmail);
        HashSet<string> UpdateValidation(ScheduleEmail scheduleEmail);
        HashSet<string> DeleteValidation(int id);
        ScheduleEmail Add(ScheduleEmail scheduleEmail);
        ScheduleEmail Update(ScheduleEmail scheduleEmail);
        void Delete(int id);
    }
}
