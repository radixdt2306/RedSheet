using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using System;
using System.Linq;

namespace RedSheet.Domain.ProjectEventTimelineModule
{
    public class EventAgendaTimingDomain : IEventAgendaTimingDomain
    {
        public EventAgendaTimingDomain(IProjectEventTimelineUow projectEventTimelineUow, IApplicationUtility applicationUtility)
        {
            ProjectEventTimelineUow = projectEventTimelineUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }

        public IEnumerable<vEventAgendaTiming> Get(int projectEventTimelineId) => ProjectEventTimelineUow.Repository<vEventAgendaTiming>().FindBy(t => t.ProjectEventTimelineId == projectEventTimelineId);

        public vEventAgendaTimingRecord Get(int projectEventTimelineId, int id) => ProjectEventTimelineUow.Repository<vEventAgendaTimingRecord>().SingleOrDefault(t => t.EventAgendaTimingId == id);

        public HashSet<string> AddValidation(EventAgendaTiming eventAgendaTiming)
        {
            var checkSortOrder = ProjectEventTimelineUow.Repository<EventAgendaTiming>().FirstOrDefault(t => t.SortOrder == eventAgendaTiming.SortOrder && t.ProjectEventTimelineId == eventAgendaTiming.ProjectEventTimelineId && t.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId || (TimeSpan.Compare(t.Time, eventAgendaTiming.Time) == 0 && t.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId && t.ProjectEventTimelineId == eventAgendaTiming.ProjectEventTimelineId));
            if (checkSortOrder != null)
            {
                // ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
                ValidationMessages.Add(DbEntities.Constants.ValidationMessages.ALREADY_EVENT_THIS_TIME);
            }

            CommonValidation(eventAgendaTiming);
            return ValidationMessages;
        }

        public EventAgendaTiming Add(EventAgendaTiming eventAgendaTiming)
        {
            ProjectEventTimelineUow.RegisterNew<EventAgendaTiming>(eventAgendaTiming);
            ProjectEventTimelineUow.Commit();
            return eventAgendaTiming;
        }
        public HashSet<string> UpdateValidation(EventAgendaTiming eventAgendaTiming)
        {
            var checkSortOrder = ProjectEventTimelineUow.Repository<EventAgendaTiming>().FirstOrDefault(t => t.Time == eventAgendaTiming.Time && t.SortOrder == eventAgendaTiming.SortOrder && t.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId && t.ProjectEventTimelineId == eventAgendaTiming.ProjectEventTimelineId && t.EventAgendaTimingId != eventAgendaTiming.EventAgendaTimingId || (TimeSpan.Compare(t.Time, eventAgendaTiming.Time) == 0 && t.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId && t.ProjectEventTimelineId == eventAgendaTiming.ProjectEventTimelineId && t.EventAgendaTimingId != eventAgendaTiming.EventAgendaTimingId));
            if (checkSortOrder != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(eventAgendaTiming);
            return ValidationMessages;
        }


        public EventAgendaTiming Update(EventAgendaTiming eventAgendaTiming)
        {
            ProjectEventTimelineUow.RegisterDirty<EventAgendaTiming>(eventAgendaTiming);
            ProjectEventTimelineUow.Commit();
            return eventAgendaTiming;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<EventAgendaTiming>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var eventAgendaTiming = ProjectEventTimelineUow.Repository<EventAgendaTiming>().FindByKey(id);
            ProjectEventTimelineUow.RegisterDeleted<EventAgendaTiming>(eventAgendaTiming);
            ProjectEventTimelineUow.Commit();
        }

        private void CommonValidation(EventAgendaTiming eventAgendaTiming)
        {

        }

        public int GetMaxSortOrder(EventAgendaTiming eventAgendaTiming)
        {
            int MaxSortOrder = 0;
            List<EventAgendaTiming> lstEvents = ProjectEventTimelineUow.Repository<EventAgendaTiming>().FindBy(a => a.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId && a.ProjectEventTimelineId == eventAgendaTiming.ProjectEventTimelineId).ToList();
            if (lstEvents.Count > 0)
                MaxSortOrder = Convert.ToInt32(lstEvents.Max(a => a.SortOrder));
            return MaxSortOrder;

        }

        private IProjectEventTimelineUow ProjectEventTimelineUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

    }
    public interface IEventAgendaTimingDomain
    {
        IEnumerable<vEventAgendaTiming> Get(int projectEventTimelineId);
        vEventAgendaTimingRecord Get(int projectEventTimelineId, int id);
        HashSet<string> AddValidation(EventAgendaTiming eventAgendaTiming);
        HashSet<string> UpdateValidation(EventAgendaTiming eventAgendaTiming);
        HashSet<string> DeleteValidation(int id);
        EventAgendaTiming Add(EventAgendaTiming eventAgendaTiming);
        EventAgendaTiming Update(EventAgendaTiming eventAgendaTiming);
        void Delete(int id);
        int GetMaxSortOrder(EventAgendaTiming eventAgendaTiming);
    }
}
