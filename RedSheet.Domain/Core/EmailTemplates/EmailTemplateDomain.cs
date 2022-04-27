using RedSheet.DbEntities.Enums;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Domain.EmailTemplates
{
    public class EmailTemplateDomain : IEmailTemplateDomain
    {
        public EmailTemplateDomain(IMasterUow masterUow, IApplicationUtility applicationUtility)
        {
            MasterUow = masterUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }
        public EmailTemplate Add(EmailTemplate emailTemplate)
        {
            emailTemplate.StatusId =(int) Status.Active;
            this.MasterUow.RegisterNew<EmailTemplate>(emailTemplate);
            this.MasterUow.Commit();
            return emailTemplate;
        }

        public HashSet<string> AddValidation(EmailTemplate emailTemplate)
        {
            var emailTemplateObject = MasterUow.Repository<EmailTemplate>().SingleOrDefault(t => t.Subject == emailTemplate.Subject && t.StatusId != (int)Status.Deleted);
            if (emailTemplateObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var emailTemplate = MasterUow.Repository<EmailTemplate>().FindByKey(id);
            emailTemplate.StatusId =(int) Status.Deleted;
            MasterUow.RegisterDirty<EmailTemplate>(emailTemplate);
            MasterUow.Commit();
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<EmailTemplate>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public EmailTemplate Update(EmailTemplate emailTemplate)
        {
            this.MasterUow.RegisterDirty<EmailTemplate>(emailTemplate);
            this.MasterUow.Commit();
            return emailTemplate;
        }

        public HashSet<string> UpdateValidation(EmailTemplate emailTemplate)
        {
            var emailTemplateObject = MasterUow.Repository<EmailTemplate>().SingleOrDefault(t => t.Subject == emailTemplate.Subject && t.EmailTemplateId != emailTemplate.EmailTemplateId && t.StatusId != (int)Status.Deleted);
            if (emailTemplateObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IMasterUow MasterUow { get; set; }

    }

    public interface IEmailTemplateDomain
    {
        HashSet<string> AddValidation(EmailTemplate emailTemplate);
        HashSet<string> UpdateValidation(EmailTemplate emailTemplate);
        HashSet<string> DeleteValidation(int id);
        EmailTemplate Add(EmailTemplate emailTemplate);
        EmailTemplate Update(EmailTemplate emailTemplate);
        void Delete(int id);
    }
}
