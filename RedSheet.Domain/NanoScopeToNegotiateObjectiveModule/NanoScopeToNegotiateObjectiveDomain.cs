using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System.Linq;

namespace RedSheet.Domain.NanoScopeToNegotiateObjectiveModule
{
    public class NanoScopeToNegotiateObjectiveDomain : INanoScopeToNegotiateObjectiveDomain
    {
        public NanoScopeToNegotiateObjectiveDomain(INanoScopeToNegotiateObjectiveUow nanoScopeToNegotiateObjectiveUow, IApplicationUtility applicationUtility)
        {
            NanoScopeToNegotiateObjectiveUow = nanoScopeToNegotiateObjectiveUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<NanoScopeToNegotiateObjective> Get() => NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateObjective>().All();

		public NanoScopeToNegotiateObjective  Get(int id) => NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateObjective>().FindByInclude(t => t.NanoScopeToNegotiateObjectiveId == id, t => t.NanoScopeToNegotiateCommunicationModes, t => t.NanoRelationshipRequire, t => t.NanoScopeToNegotiate, t => t.ValueObjective).SingleOrDefault();

        public HashSet<string> AddValidation(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
            CommonValidation(nanoScopeToNegotiateObjective);
            return ValidationMessages;
        }

        public NanoScopeToNegotiateObjective Add(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
            NanoScopeToNegotiateObjectiveUow.RegisterNew<NanoScopeToNegotiateObjective>(nanoScopeToNegotiateObjective);
            NanoScopeToNegotiateObjectiveUow.Commit();
            return nanoScopeToNegotiateObjective;
        }
        public HashSet<string> UpdateValidation(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
			CommonValidation(nanoScopeToNegotiateObjective);
           return ValidationMessages;
        }

        public NanoScopeToNegotiateObjective Update(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
			var nanoScopeToNegotiateCommunicationModes = NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateCommunicationMode>().FindBy(t => t.NanoScopeToNegotiateObjectiveId == nanoScopeToNegotiateObjective.NanoScopeToNegotiateObjectiveId).ToList();
			nanoScopeToNegotiateCommunicationModes.ForEach(t =>
			{
				NanoScopeToNegotiateObjectiveUow.RegisterDeleted<NanoScopeToNegotiateCommunicationMode>(t);
			});
			foreach (var nanoScopeToNegotiateCommunicationMode in nanoScopeToNegotiateObjective.NanoScopeToNegotiateCommunicationModes)
			{
				NanoScopeToNegotiateObjectiveUow.RegisterNew<NanoScopeToNegotiateCommunicationMode>(nanoScopeToNegotiateCommunicationMode);
			}
			NanoScopeToNegotiateObjectiveUow.RegisterDirty<NanoScopeToNegotiateObjective>(nanoScopeToNegotiateObjective);
            NanoScopeToNegotiateObjectiveUow.Commit();
            return nanoScopeToNegotiateObjective;
        }

		public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<NanoScopeToNegotiateObjective>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var nanoScopeToNegotiateObjective = NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateObjective>().FindByKey(id);
            NanoScopeToNegotiateObjectiveUow.RegisterDeleted<NanoScopeToNegotiateObjective>(nanoScopeToNegotiateObjective);
            NanoScopeToNegotiateObjectiveUow.Commit();
        }
 
		private void CommonValidation(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective) {
        
		}

        private INanoScopeToNegotiateObjectiveUow NanoScopeToNegotiateObjectiveUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface INanoScopeToNegotiateObjectiveDomain
    {
		IEnumerable<NanoScopeToNegotiateObjective> Get();
		NanoScopeToNegotiateObjective  Get(int id)  ;
        HashSet<string> AddValidation(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective);
        HashSet<string> UpdateValidation(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective);
        HashSet<string> DeleteValidation(int id);
        NanoScopeToNegotiateObjective Add(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective);
        NanoScopeToNegotiateObjective Update(NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective);
        void Delete(int id);
    }
}
