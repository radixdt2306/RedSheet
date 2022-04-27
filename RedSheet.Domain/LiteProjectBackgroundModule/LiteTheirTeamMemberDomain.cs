using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.LiteProjectBackgroundModule
{
    public class LiteTheirTeamMemberDomain : ILiteTheirTeamMemberDomain
    {
        public LiteTheirTeamMemberDomain(ILiteProjectBackgroundUow liteProjectBackgroundUow, IApplicationUtility applicationUtility)
        {
            LiteProjectBackgroundUow = liteProjectBackgroundUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<vLiteTheirTeamMember> Get(int liteProjectBackgroundId) => LiteProjectBackgroundUow.Repository<vLiteTheirTeamMember>().FindBy(t=> t.LiteProjectBackgroundId == liteProjectBackgroundId);

        public vLiteTheirTeamMemberRecord   Get(int liteProjectBackgroundId, int id)  => LiteProjectBackgroundUow.Repository<vLiteTheirTeamMemberRecord>().SingleOrDefault(t => t.LiteTheirTeamMemberId == id);

        public HashSet<string> AddValidation(LiteTheirTeamMember liteTheirTeamMember)
        {
            CommonValidation(liteTheirTeamMember);
			var liteTheirTeamMemberObject = LiteProjectBackgroundUow.Repository<LiteTheirTeamMember>().SingleOrDefault(t => t.LiteTheirTeamMemberName == liteTheirTeamMember.LiteTheirTeamMemberName && t.LiteProjectBackgroundId == liteTheirTeamMember.LiteProjectBackgroundId);
			if (liteTheirTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public LiteTheirTeamMember Add(LiteTheirTeamMember liteTheirTeamMember)
        {
            LiteProjectBackgroundUow.RegisterNew<LiteTheirTeamMember>(liteTheirTeamMember);
            LiteProjectBackgroundUow.Commit();
            return liteTheirTeamMember;
        }
        public HashSet<string> UpdateValidation(LiteTheirTeamMember liteTheirTeamMember)
        {
			CommonValidation(liteTheirTeamMember);
			var liteTheirTeamMemberObject = LiteProjectBackgroundUow.Repository<LiteTheirTeamMember>().SingleOrDefault(t => t.LiteTheirTeamMemberName == liteTheirTeamMember.LiteTheirTeamMemberName && t.LiteTheirTeamMemberId != liteTheirTeamMember.LiteTheirTeamMemberId && t.LiteProjectBackgroundId == liteTheirTeamMember.LiteProjectBackgroundId);
			if (liteTheirTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits,true));
            }
           return ValidationMessages;
        }

        public LiteTheirTeamMember Update(LiteTheirTeamMember liteTheirTeamMember)
        {
            LiteProjectBackgroundUow.RegisterDirty<LiteTheirTeamMember>(liteTheirTeamMember);
            LiteProjectBackgroundUow.Commit();
            return liteTheirTeamMember;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<LiteTheirTeamMember>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var liteTheirTeamMember = LiteProjectBackgroundUow.Repository<LiteTheirTeamMember>().FindByKey(id);
            LiteProjectBackgroundUow.RegisterDeleted<LiteTheirTeamMember>(liteTheirTeamMember);
            LiteProjectBackgroundUow.Commit();
        }
 
		private void CommonValidation(LiteTheirTeamMember liteTheirTeamMember) {
        
		}

        private ILiteProjectBackgroundUow LiteProjectBackgroundUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface ILiteTheirTeamMemberDomain
    {
		IEnumerable<vLiteTheirTeamMember> Get(int liteProjectBackgroundId);
		vLiteTheirTeamMemberRecord   Get(int liteProjectBackgroundId, int id) ;
        HashSet<string> AddValidation(LiteTheirTeamMember liteTheirTeamMember);
        HashSet<string> UpdateValidation(LiteTheirTeamMember liteTheirTeamMember);
        HashSet<string> DeleteValidation(int id);
        LiteTheirTeamMember Add(LiteTheirTeamMember liteTheirTeamMember);
        LiteTheirTeamMember Update(LiteTheirTeamMember liteTheirTeamMember);
        void Delete(int id);
    }
}
