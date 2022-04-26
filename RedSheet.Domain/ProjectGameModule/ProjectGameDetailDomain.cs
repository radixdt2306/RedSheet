using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectGameModule
{
    public class ProjectGameDetailDomain : IProjectGameDetailDomain
    {
        public ProjectGameDetailDomain(IProjectUow projectUow, IProjectGameUow projectGameUow, IApplicationUtility applicationUtility)
        {
            ProjectUow = projectUow;
            ProjectGameUow = projectGameUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectGameDetail projectGameDetail)
        {
            var gameModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectGameDetail.ProjectModuleId);
            var cultureModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == gameModuleData.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == cultureModuleData.ProjectModuleId);
            if(projectCultureData == null)
            {
                ValidationMessages.Add("Please enter culture details.");
                if (projectGameDetail.Games.Count < 1)
                {
                    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.minimumOneGame, true));
                    CommonValidation(projectGameDetail);
                }
            }
			return ValidationMessages;
		}
   
        public ProjectGameDetail Add(ProjectGameDetail projectGameDetail)
        {
            ProjectGameUow.RegisterNew<ProjectGameDetail>(projectGameDetail);
            ProjectGameUow.Commit();
            return projectGameDetail;
        }
        public HashSet<string> UpdateValidation(ProjectGameDetail projectGameDetail)
        {
			CommonValidation(projectGameDetail);
            var gameModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectGameDetail.ProjectModuleId);
            var cultureModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == gameModuleData.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == cultureModuleData.ProjectModuleId);
            if (projectCultureData == null)
            {
                ValidationMessages.Add("Please enter culture details.");
            }
                return ValidationMessages;
        }

		public ProjectGameDetail Update(ProjectGameDetail projectGameDetail)
		{
			ProjectGameUow.RegisterDirty<ProjectGameDetail>(projectGameDetail);
			foreach (var data in projectGameDetail.Games)
			{
				if (data.GameId > 0)
				{
					ProjectGameUow.RegisterDirty<Game>(data);
				}
				else
				{
					ProjectGameUow.RegisterNew<Game>(data);
				}
			}
			ProjectGameUow.Commit();
			return projectGameDetail;
		}
		 
		public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<Game>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var gameDetail = ProjectGameUow.Repository<Game>().FindByKey(id);
            ProjectGameUow.RegisterDeleted<Game>(gameDetail);
            ProjectGameUow.Commit();
        }
 
		private void CommonValidation(ProjectGameDetail projectGameDetail) {
        
		}
        private void GameRemove(int ProjectGameDetailId)
        {
            var gameDetailList = ProjectGameUow.Repository<Game>().FindBy(a => a.ProjectGameDetailId == ProjectGameDetailId);

            foreach (Game data in gameDetailList)
            {
                if (data.ProjectGameDetailId == ProjectGameDetailId)
                {
                    ProjectGameUow.RegisterDeleted<Game>(data);
                    ProjectGameUow.Commit();
                }
            }
        }

        private IProjectUow ProjectUow { get; set; }

        private IProjectGameUow ProjectGameUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface IProjectGameDetailDomain
    {
        HashSet<string> AddValidation(ProjectGameDetail projectGameDetail);
        HashSet<string> UpdateValidation(ProjectGameDetail projectGameDetail);
        HashSet<string> DeleteValidation(int id);
        ProjectGameDetail Add(ProjectGameDetail projectGameDetail);
        ProjectGameDetail Update(ProjectGameDetail projectGameDetail);
        void Delete(int id);
    }
}
