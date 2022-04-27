using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.LiteProjectBackgroundModule
{
    public class LiteOurTeamMemberDomain : ILiteOurTeamMemberDomain
    {
        public LiteOurTeamMemberDomain(ILiteProjectBackgroundUow liteProjectBackgroundUow, IApplicationUtility applicationUtility)
        {
            LiteProjectBackgroundUow = liteProjectBackgroundUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<vLiteOurTeamMember> Get(int liteProjectBackgroundId) => LiteProjectBackgroundUow.Repository<vLiteOurTeamMember>().FindBy(t=> t.LiteProjectBackgroundId == liteProjectBackgroundId);

        public vLiteOurTeamMemberRecord   Get(int liteProjectBackgroundId, int id)  => LiteProjectBackgroundUow.Repository<vLiteOurTeamMemberRecord>().SingleOrDefault(t => t.LiteOurTeamMemberId == id);

        public HashSet<string> AddValidation(LiteOurTeamMember liteOurTeamMember)
        {	
			CommonValidation(liteOurTeamMember);
			var liteOurTeamMemberObject = LiteProjectBackgroundUow.Repository<LiteOurTeamMember>().SingleOrDefault(t => t.LiteProjectBackgroundId == liteOurTeamMember.LiteProjectBackgroundId && t.LiteOurTeamMemberName == liteOurTeamMember.LiteOurTeamMemberName);
			if (liteOurTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public LiteOurTeamMember Add(LiteOurTeamMember liteOurTeamMember)
        {
            LiteProjectBackgroundUow.RegisterNew<LiteOurTeamMember>(liteOurTeamMember);
            LiteProjectBackgroundUow.Commit();
            return liteOurTeamMember;
        }
        public HashSet<string> UpdateValidation(LiteOurTeamMember liteOurTeamMember)
        {
			CommonValidation(liteOurTeamMember);
			var liteOurTeamMemberObject = LiteProjectBackgroundUow.Repository<LiteOurTeamMember>().SingleOrDefault(t => t.LiteProjectBackgroundId == liteOurTeamMember.LiteProjectBackgroundId && t.LiteOurTeamMemberId != liteOurTeamMember.LiteOurTeamMemberId && t.LiteOurTeamMemberName == liteOurTeamMember.LiteOurTeamMemberName);
			if (liteOurTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits,true));
            }
           return ValidationMessages;
        }

        public LiteOurTeamMember Update(LiteOurTeamMember liteOurTeamMember)
        {
            LiteProjectBackgroundUow.RegisterDirty<LiteOurTeamMember>(liteOurTeamMember);
            LiteProjectBackgroundUow.Commit();
            return liteOurTeamMember;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<LiteOurTeamMember>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var liteOurTeamMember = LiteProjectBackgroundUow.Repository<LiteOurTeamMember>().FindByKey(id);
            LiteProjectBackgroundUow.RegisterDeleted<LiteOurTeamMember>(liteOurTeamMember);
            LiteProjectBackgroundUow.Commit();
        }
 
		private void CommonValidation(LiteOurTeamMember liteOurTeamMember) {
        
		}

        private ILiteProjectBackgroundUow LiteProjectBackgroundUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface ILiteOurTeamMemberDomain
    {
		IEnumerable<vLiteOurTeamMember> Get(int liteProjectBackgroundId);
		vLiteOurTeamMemberRecord   Get(int liteProjectBackgroundId, int id) ;
        HashSet<string> AddValidation(LiteOurTeamMember liteOurTeamMember);
        HashSet<string> UpdateValidation(LiteOurTeamMember liteOurTeamMember);
        HashSet<string> DeleteValidation(int id);
        LiteOurTeamMember Add(LiteOurTeamMember liteOurTeamMember);
        LiteOurTeamMember Update(LiteOurTeamMember liteOurTeamMember);
        void Delete(int id);
    }
}
