using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectBackgroundModule
{
    public class BackgroundEventDomain : IBackgroundEventDomain
    {
        public BackgroundEventDomain(IProjectBackgroundUow projectBackgroundUow, IApplicationUtility applicationUtility)
        {
            ProjectBackgroundUow = projectBackgroundUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }

        public IEnumerable<vBackgroundEvent> Get(int projectBackgroundId) => ProjectBackgroundUow.Repository<vBackgroundEvent>().FindBy(t => t.ProjectBackgroundId == projectBackgroundId);

        public vBackgroundEventRecord Get(int projectBackgroundId, int id) => ProjectBackgroundUow.Repository<vBackgroundEventRecord>().SingleOrDefault(t => t.BackgroundEventId == id);

        public HashSet<string> AddValidation(BackgroundEvent backgroundEvent)
        {
            var backgroundEventName = ProjectBackgroundUow.Repository<BackgroundEvent>().SingleOrDefault(t => t.Title == backgroundEvent.Title && t.ProjectBackgroundId == backgroundEvent.ProjectBackgroundId && t.IsEvent == backgroundEvent.IsEvent);
            if (backgroundEventName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            var startDate = backgroundEvent.StartDate;
            var endDate = backgroundEvent.EndDate;
            if (startDate > endDate)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.StartDateShouldbeLessThanEndDate, true));
            }
            return ValidationMessages;
        }
        
        public BackgroundEvent Add(BackgroundEvent backgroundEvent)
        {
            ProjectBackgroundUow.RegisterNew<BackgroundEvent>(backgroundEvent);
            ProjectBackgroundUow.Commit();
            return backgroundEvent;
        }
        public HashSet<string> UpdateValidation(BackgroundEvent backgroundEvent)
        {
            var backgroundEventName = ProjectBackgroundUow.Repository<BackgroundEvent>().SingleOrDefault(t => t.Title == backgroundEvent.Title && t.BackgroundEventId != backgroundEvent.BackgroundEventId && t.ProjectBackgroundId == backgroundEvent.ProjectBackgroundId && t.IsEvent == backgroundEvent.IsEvent);
            if (backgroundEventName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            var startDate = backgroundEvent.StartDate;
            var endDate = backgroundEvent.EndDate;
            if (startDate > endDate)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.StartDateShouldbeLessThanEndDate, true));
            }
            return ValidationMessages;
        }

        public BackgroundEvent Update(BackgroundEvent backgroundEvent)
        {
            ProjectBackgroundUow.RegisterDirty<BackgroundEvent>(backgroundEvent);
            ProjectBackgroundUow.Commit();
            return backgroundEvent;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<BackgroundEvent>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var backgroundEvent = ProjectBackgroundUow.Repository<BackgroundEvent>().FindByKey(id);
            ProjectBackgroundUow.RegisterDeleted<BackgroundEvent>(backgroundEvent);
            ProjectBackgroundUow.Commit();
        }

        private void CommonValidation(BackgroundEvent backgroundEvent)
        {

        }
        private IProjectBackgroundUow ProjectBackgroundUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }
    }
    public interface IBackgroundEventDomain
    {
        IEnumerable<vBackgroundEvent> Get(int projectBackgroundId);
        vBackgroundEventRecord Get(int projectBackgroundId, int id);
        HashSet<string> AddValidation(BackgroundEvent backgroundEvent);
        HashSet<string> UpdateValidation(BackgroundEvent backgroundEvent);
        HashSet<string> DeleteValidation(int id);
        BackgroundEvent Add(BackgroundEvent backgroundEvent);
        BackgroundEvent Update(BackgroundEvent backgroundEvent);
        void Delete(int id);
    }
}
