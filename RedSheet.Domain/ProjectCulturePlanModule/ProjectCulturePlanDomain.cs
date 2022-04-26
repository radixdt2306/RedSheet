using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectCulturePlanModule
{
    public class ProjectCulturePlanDomain : IProjectCulturePlanDomain
    {
        public ProjectCulturePlanDomain(IProjectCulturePlanUow projectCulturePlanUow, IApplicationUtility applicationUtility)
        {
            ProjectCulturePlanUow = projectCulturePlanUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectCulturePlan projectCulturePlan)
        {
            CommonValidation(projectCulturePlan);
            return ValidationMessages;
        }

        public ProjectCulturePlan Add(ProjectCulturePlan projectCulturePlan)
        {
            ProjectCulturePlanUow.RegisterNew<ProjectCulturePlan>(projectCulturePlan);
            ProjectCulturePlanUow.Commit();
            return projectCulturePlan;
        }
        public HashSet<string> UpdateValidation(ProjectCulturePlan projectCulturePlan)
        {
			CommonValidation(projectCulturePlan);
           return ValidationMessages;
        }

        public ProjectCulturePlan Update(ProjectCulturePlan projectCulturePlan)
        {
            ProjectCulturePlanUow.RegisterDirty<ProjectCulturePlan>(projectCulturePlan);
            ProjectCulturePlanUow.Commit();
            return projectCulturePlan;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<ProjectCulturePlan>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectCulturePlan = ProjectCulturePlanUow.Repository<ProjectCulturePlan>().FindByKey(id);
            ProjectCulturePlanUow.RegisterDeleted<ProjectCulturePlan>(projectCulturePlan);
            ProjectCulturePlanUow.Commit();
        }
 
		private void CommonValidation(ProjectCulturePlan projectCulturePlan) {
        
		}

        private IProjectCulturePlanUow ProjectCulturePlanUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface IProjectCulturePlanDomain
    {
        HashSet<string> AddValidation(ProjectCulturePlan projectCulturePlan);
        HashSet<string> UpdateValidation(ProjectCulturePlan projectCulturePlan);
        HashSet<string> DeleteValidation(int id);
        ProjectCulturePlan Add(ProjectCulturePlan projectCulturePlan);
        ProjectCulturePlan Update(ProjectCulturePlan projectCulturePlan);
        void Delete(int id);
    }
}
