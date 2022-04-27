using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectRequirementModule
{
    public class ProjectRequirementDomain : IProjectRequirementDomain
    {
        public ProjectRequirementDomain(IProjectRequirementUow projectRequirementUow, IApplicationUtility applicationUtility)
        {
            ProjectRequirementUow = projectRequirementUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectRequirement projectRequirement)
        {
            CommonValidation(projectRequirement);
            return ValidationMessages;
        }

        public ProjectRequirement Add(ProjectRequirement projectRequirement)
        {
            ProjectRequirementUow.RegisterNew<ProjectRequirement>(projectRequirement);
            ProjectRequirementUow.Commit();
            return projectRequirement;
        }
        public HashSet<string> UpdateValidation(ProjectRequirement projectRequirement)
        {
			CommonValidation(projectRequirement);
           return ValidationMessages;
        }

        public ProjectRequirement Update(ProjectRequirement projectRequirement)
        {
            ProjectRequirementUow.RegisterDirty<ProjectRequirement>(projectRequirement);
            ProjectRequirementUow.Commit();
            return projectRequirement;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            OurRequirenmentDetailRemove(id);
            var isFailed = ApplicationUtility.CandDelete<ProjectRequirement>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectRequirement = ProjectRequirementUow.Repository<ProjectRequirement>().FindByKey(id);
            ProjectRequirementUow.RegisterDeleted<ProjectRequirement>(projectRequirement);
            ProjectRequirementUow.Commit();
        }
 
		private void CommonValidation(ProjectRequirement projectRequirement) {
        
		}

        private IProjectRequirementUow ProjectRequirementUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }

        private void OurRequirenmentDetailRemove(int ProjectRequirementId)
        {
            var ourRequirenmentDetailList = ProjectRequirementUow.Repository<OurRequirementDetail>().FindBy(a => a.ProjectRequirementId == ProjectRequirementId);
            var ourbatnaList = ProjectRequirementUow.Repository<Ourbatna>().FindBy(a => a.ProjectRequirementId == ProjectRequirementId);

            foreach (OurRequirementDetail data in ourRequirenmentDetailList)
            {
                if (data.ProjectRequirementId == ProjectRequirementId)
                {
                    ProjectRequirementUow.RegisterDeleted<OurRequirementDetail>(data);
                    ProjectRequirementUow.Commit();
                }
            }
            foreach (Ourbatna data in ourbatnaList)
            {
                if (data.ProjectRequirementId == ProjectRequirementId)
                {
                    ProjectRequirementUow.RegisterDeleted<Ourbatna>(data);
                    ProjectRequirementUow.Commit();
                }
            }
        }

    }
    public interface IProjectRequirementDomain
    {
        HashSet<string> AddValidation(ProjectRequirement projectRequirement);
        HashSet<string> UpdateValidation(ProjectRequirement projectRequirement);
        HashSet<string> DeleteValidation(int id);
        ProjectRequirement Add(ProjectRequirement projectRequirement);
        ProjectRequirement Update(ProjectRequirement projectRequirement);
        void Delete(int id);
    }
}
