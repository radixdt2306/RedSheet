using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System;
using System.Linq;

namespace RedSheet.Domain.LiteMeetingManagementModule
{
    public class LiteMeetingManagementTimingDomain : ILiteMeetingManagementTimingDomain
    {
        public LiteMeetingManagementTimingDomain(ILiteMeetingManagementUow liteMeetingManagementUow, IApplicationUtility applicationUtility)
        {
            LiteMeetingManagementUow = liteMeetingManagementUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<vLiteMeetingManagementTiming> Get(int liteMeetingManagementId) => LiteMeetingManagementUow.Repository<vLiteMeetingManagementTiming>().FindBy(t=> t.LiteMeetingManagementId == liteMeetingManagementId);

        public vLiteMeetingManagementTimingRecord   Get(int liteMeetingManagementId, int id)  => LiteMeetingManagementUow.Repository<vLiteMeetingManagementTimingRecord>().SingleOrDefault(t => t.LiteMeetingManagementTimingId == id);

        public HashSet<string> AddValidation(LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
			var checkSortOrder = LiteMeetingManagementUow.Repository<LiteMeetingManagementTiming>().FirstOrDefault(t => t.SortOrder == liteMeetingManagementTiming.SortOrder && t.LiteMeetingManagementId == liteMeetingManagementTiming.LiteMeetingManagementId && t.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId || (TimeSpan.Compare(t.Time, liteMeetingManagementTiming.Time) == 0 && t.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId && t.LiteMeetingManagementId == liteMeetingManagementTiming.LiteMeetingManagementId));
			if (checkSortOrder != null)
			{
				ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
			}
			CommonValidation(liteMeetingManagementTiming);
            return ValidationMessages;
        }

        public LiteMeetingManagementTiming Add(LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
            LiteMeetingManagementUow.RegisterNew<LiteMeetingManagementTiming>(liteMeetingManagementTiming);
            LiteMeetingManagementUow.Commit();
            return liteMeetingManagementTiming;
        }
        public HashSet<string> UpdateValidation(LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
			var checkSortOrder = LiteMeetingManagementUow.Repository<LiteMeetingManagementTiming>().FirstOrDefault(t => t.Time == liteMeetingManagementTiming.Time && t.SortOrder == liteMeetingManagementTiming.SortOrder && t.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId && t.LiteMeetingManagementId == liteMeetingManagementTiming.LiteMeetingManagementId && t.LiteMeetingManagementTimingId != liteMeetingManagementTiming.LiteMeetingManagementTimingId || (TimeSpan.Compare(t.Time, liteMeetingManagementTiming.Time) == 0 && t.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId && t.LiteMeetingManagementId == liteMeetingManagementTiming.LiteMeetingManagementId && t.LiteMeetingManagementTimingId != liteMeetingManagementTiming.LiteMeetingManagementTimingId));
			if (checkSortOrder != null)
			{
				ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
			}
			CommonValidation(liteMeetingManagementTiming);
           return ValidationMessages;
        }

        public LiteMeetingManagementTiming Update(LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
            LiteMeetingManagementUow.RegisterDirty<LiteMeetingManagementTiming>(liteMeetingManagementTiming);
            LiteMeetingManagementUow.Commit();
            return liteMeetingManagementTiming;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<LiteMeetingManagementTiming>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var liteMeetingManagementTiming = LiteMeetingManagementUow.Repository<LiteMeetingManagementTiming>().FindByKey(id);
            LiteMeetingManagementUow.RegisterDeleted<LiteMeetingManagementTiming>(liteMeetingManagementTiming);
            LiteMeetingManagementUow.Commit();
        }
 
		private void CommonValidation(LiteMeetingManagementTiming liteMeetingManagementTiming) {
        
		}

        public int GetMaxSortOrder(LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
            int MaxSortOrder = 0;
            List<LiteMeetingManagementTiming> lstEvents = LiteMeetingManagementUow.Repository<LiteMeetingManagementTiming>().FindBy(a => a.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId && a.LiteMeetingManagementId == liteMeetingManagementTiming.LiteMeetingManagementId).ToList();
            if (lstEvents.Count > 0)
                MaxSortOrder = Convert.ToInt32(lstEvents.Max(a => a.SortOrder));
            return MaxSortOrder;

        }

        private ILiteMeetingManagementUow LiteMeetingManagementUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface ILiteMeetingManagementTimingDomain
    {
		IEnumerable<vLiteMeetingManagementTiming> Get(int liteMeetingManagementId);
		vLiteMeetingManagementTimingRecord   Get(int liteMeetingManagementId, int id) ;
        HashSet<string> AddValidation(LiteMeetingManagementTiming liteMeetingManagementTiming);
        HashSet<string> UpdateValidation(LiteMeetingManagementTiming liteMeetingManagementTiming);
        HashSet<string> DeleteValidation(int id);
        LiteMeetingManagementTiming Add(LiteMeetingManagementTiming liteMeetingManagementTiming);
        LiteMeetingManagementTiming Update(LiteMeetingManagementTiming liteMeetingManagementTiming);
        void Delete(int id);
        int GetMaxSortOrder(LiteMeetingManagementTiming liteMeetingManagementTiming);
    }
}
