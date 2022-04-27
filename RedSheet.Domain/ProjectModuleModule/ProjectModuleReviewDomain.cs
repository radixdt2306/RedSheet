using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectModuleModule
{
    public class ProjectModuleReviewDomain : IProjectModuleReviewDomain
    {
        public ProjectModuleReviewDomain(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility)
        {
            ProjectModuleUow = projectModuleUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

		public IEnumerable<ProjectModuleReview> Get(int projectModuleId) => ProjectModuleUow.Repository<ProjectModuleReview>().FindBy(t=> t.ProjectModuleId == projectModuleId);

        public vProjectModuleReviewRecord   Get(int projectModuleId, int id)  => ProjectModuleUow.Repository<vProjectModuleReviewRecord>().SingleOrDefault(t => t.ProjectModuleReviewId == id);

        public HashSet<string> AddValidation(ProjectModuleReview projectModuleReview)
        {
            CommonValidation(projectModuleReview);
            return ValidationMessages;
        }

        public ProjectModuleReview Add(ProjectModuleReview projectModuleReview)
        {
            ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectModuleReview);
            ProjectModuleUow.Commit();
            return projectModuleReview;
        }
        public HashSet<string> UpdateValidation(ProjectModuleReview projectModuleReview)
        {
			CommonValidation(projectModuleReview);
           return ValidationMessages;
        }

        public ProjectModuleReview Update(ProjectModuleReview projectModuleReview)
        {   
            ProjectModuleUow.RegisterDirty<ProjectModuleReview>(projectModuleReview);
            ProjectModuleUow.Commit();
            return projectModuleReview;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<ProjectModuleReview>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectModuleReview = ProjectModuleUow.Repository<ProjectModuleReview>().FindByKey(id);
            ProjectModuleUow.RegisterDeleted<ProjectModuleReview>(projectModuleReview);
            ProjectModuleUow.Commit();
        }
 
		private void CommonValidation(ProjectModuleReview projectModuleReview) {
        
		}

        private IProjectModuleUow ProjectModuleUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface IProjectModuleReviewDomain
    {
		IEnumerable<ProjectModuleReview> Get(int projectModuleId);
		vProjectModuleReviewRecord   Get(int projectModuleId, int id) ;
        HashSet<string> AddValidation(ProjectModuleReview projectModuleReview);
        HashSet<string> UpdateValidation(ProjectModuleReview projectModuleReview);
        HashSet<string> DeleteValidation(int id);
        ProjectModuleReview Add(ProjectModuleReview projectModuleReview);
        ProjectModuleReview Update(ProjectModuleReview projectModuleReview);
        void Delete(int id);
    }
}
