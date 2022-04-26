using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectNegotiationModule
{
    public class TheirTeamMemberDomain : ITheirTeamMemberDomain
    {
        public TheirTeamMemberDomain(IProjectNegotiationUow projectNegotiationUow, IApplicationUtility applicationUtility)
        {
            ProjectNegotiationUow = projectNegotiationUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<vTheirTeamMember> Get(int projectNegotiationId) => ProjectNegotiationUow.Repository<vTheirTeamMember>().FindBy(t=> t.ProjectNegotiationId == projectNegotiationId);

        public vTheirTeamMemberRecord   Get(int projectNegotiationId, int id)  => ProjectNegotiationUow.Repository<vTheirTeamMemberRecord>().SingleOrDefault(t => t.TheirTeamMemberId == id);

        public HashSet<string> AddValidation(TheirTeamMember theirTeamMember)
        {
            CommonValidation(theirTeamMember);
            var theirTeamMemberObject = ProjectNegotiationUow.Repository<TheirTeamMember>().SingleOrDefault(t => t.TheirTeamMemberName == theirTeamMember.TheirTeamMemberName && t.ProjectNegotiationId == theirTeamMember.ProjectNegotiationId);
            if (theirTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public TheirTeamMember Add(TheirTeamMember theirTeamMember)
        {
            ProjectNegotiationUow.RegisterNew<TheirTeamMember>(theirTeamMember);
            ProjectNegotiationUow.Commit();
            return theirTeamMember;
        }
        public HashSet<string> UpdateValidation(TheirTeamMember theirTeamMember)
        {
			CommonValidation(theirTeamMember);
            var theirTeamMemberObject = ProjectNegotiationUow.Repository<TheirTeamMember>().SingleOrDefault(t => t.TheirTeamMemberName == theirTeamMember.TheirTeamMemberName  && t.TheirTeamMemberId != theirTeamMember.TheirTeamMemberId && t.ProjectNegotiationId == theirTeamMember.ProjectNegotiationId);
            if (theirTeamMemberObject != null) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits,true));
            }
           return ValidationMessages;
        }

        public TheirTeamMember Update(TheirTeamMember theirTeamMember)
        {
            ProjectNegotiationUow.RegisterDirty<TheirTeamMember>(theirTeamMember);
            ProjectNegotiationUow.Commit();
            return theirTeamMember;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<TheirTeamMember>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var theirTeamMember = ProjectNegotiationUow.Repository<TheirTeamMember>().FindByKey(id);
            ProjectNegotiationUow.RegisterDeleted<TheirTeamMember>(theirTeamMember);
            ProjectNegotiationUow.Commit();
        }
 
		private void CommonValidation(TheirTeamMember theirTeamMember) {
        
		}

        private IProjectNegotiationUow ProjectNegotiationUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface ITheirTeamMemberDomain
    {
		IEnumerable<vTheirTeamMember> Get(int projectNegotiationId);
		vTheirTeamMemberRecord   Get(int projectNegotiationId, int id) ;
        HashSet<string> AddValidation(TheirTeamMember theirTeamMember);
        HashSet<string> UpdateValidation(TheirTeamMember theirTeamMember);
        HashSet<string> DeleteValidation(int id);
        TheirTeamMember Add(TheirTeamMember theirTeamMember);
        TheirTeamMember Update(TheirTeamMember theirTeamMember);
        void Delete(int id);
    }
}
