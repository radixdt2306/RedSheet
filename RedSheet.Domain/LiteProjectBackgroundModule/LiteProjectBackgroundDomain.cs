using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System.Linq;

namespace RedSheet.Domain.LiteProjectBackgroundModule
{
    public class LiteProjectBackgroundDomain : ILiteProjectBackgroundDomain
    {
        public LiteProjectBackgroundDomain(ILiteProjectBackgroundUow liteProjectBackgroundUow, IApplicationUtility applicationUtility)
        {
            LiteProjectBackgroundUow = liteProjectBackgroundUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<LiteProjectBackground> Get() => LiteProjectBackgroundUow.Repository<LiteProjectBackground>().All();
		
		public LiteProjectBackground Get(int id) => LiteProjectBackgroundUow.Repository<LiteProjectBackground>().FindByInclude(t => t.LiteProjectBackgroundId == id, x => x.LiteBackgroundCommunicationModes,x => x.LiteOurTeamMembers,x=>x.LiteTheirTeamMembers).SingleOrDefault();
		//public vLiteProjectBackgroundRecord  Get(int id)   => LiteProjectBackgroundUow.Repository<vLiteProjectBackgroundRecord>().SingleOrDefault(t => t.LiteProjectBackgroundId == id);

		public HashSet<string> AddValidation(LiteProjectBackground liteProjectBackground)
        {
            CommonValidation(liteProjectBackground);
            return ValidationMessages;
        }

        public LiteProjectBackground Add(LiteProjectBackground liteProjectBackground)
        {
            LiteProjectBackgroundUow.RegisterNew<LiteProjectBackground>(liteProjectBackground);
            LiteProjectBackgroundUow.Commit();
            return liteProjectBackground;
        }
        public HashSet<string> UpdateValidation(LiteProjectBackground liteProjectBackground)
        {
			CommonValidation(liteProjectBackground);
           return ValidationMessages;
        }

        public LiteProjectBackground Update(LiteProjectBackground liteProjectBackground)
        {
			var liteBackgroundCommunicationModes = LiteProjectBackgroundUow.Repository<LiteBackgroundCommunicationMode>().FindBy(t => t.LiteProjectBackgroundId == liteProjectBackground.LiteProjectBackgroundId).ToList();
			liteBackgroundCommunicationModes.ForEach(t =>
			{
				LiteProjectBackgroundUow.RegisterDeleted<LiteBackgroundCommunicationMode>(t);
			});
			
			foreach (var liteBackgroundCommunicationMode in liteProjectBackground.LiteBackgroundCommunicationModes)
			{
				LiteProjectBackgroundUow.RegisterNew<LiteBackgroundCommunicationMode>(liteBackgroundCommunicationMode);
			}
			LiteProjectBackgroundUow.RegisterDirty<LiteProjectBackground>(liteProjectBackground);
			LiteProjectBackgroundUow.Commit();
			return liteProjectBackground;
		}
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<LiteProjectBackground>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var liteProjectBackground = LiteProjectBackgroundUow.Repository<LiteProjectBackground>().FindByKey(id);
            LiteProjectBackgroundUow.RegisterDeleted<LiteProjectBackground>(liteProjectBackground);
            LiteProjectBackgroundUow.Commit();
        }
 
		private void CommonValidation(LiteProjectBackground liteProjectBackground) {
        
		}

        private ILiteProjectBackgroundUow LiteProjectBackgroundUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface ILiteProjectBackgroundDomain
    {
		IEnumerable<LiteProjectBackground> Get();
		LiteProjectBackground Get(int id)  ;
        HashSet<string> AddValidation(LiteProjectBackground liteProjectBackground);
        HashSet<string> UpdateValidation(LiteProjectBackground liteProjectBackground);
        HashSet<string> DeleteValidation(int id);
        LiteProjectBackground Add(LiteProjectBackground liteProjectBackground);
        LiteProjectBackground Update(LiteProjectBackground liteProjectBackground);
        void Delete(int id);
    }
}
