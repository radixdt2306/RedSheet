using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectBackgroundModule
{
    public class ProjectBackgroundDomain : IProjectBackgroundDomain
    {
        public ProjectBackgroundDomain(IProjectBackgroundUow projectBackgroundUow, IApplicationUtility applicationUtility)
        {
            ProjectBackgroundUow = projectBackgroundUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectBackground projectBackground)
        {
            CommonValidation(projectBackground);
            return ValidationMessages;
        }

        public ProjectBackground Add(ProjectBackground projectBackground)
        {
            ProjectBackgroundUow.RegisterNew<ProjectBackground>(projectBackground);
            ProjectBackgroundUow.Commit();
            return projectBackground;
        }
        public HashSet<string> UpdateValidation(ProjectBackground projectBackground)
        {
			CommonValidation(projectBackground);
           return ValidationMessages;
        }

        public ProjectBackground Update(ProjectBackground projectBackground)
        {
            ProjectBackgroundUow.RegisterDirty<ProjectBackground>(projectBackground);
            ProjectBackgroundUow.Commit();
            return projectBackground;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            BackGroundDetailRemove(id);
            var isFailed = ApplicationUtility.CandDelete<ProjectBackground>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectBackground = ProjectBackgroundUow.Repository<ProjectBackground>().FindByKey(id);
            ProjectBackgroundUow.RegisterDeleted<ProjectBackground>(projectBackground);
            ProjectBackgroundUow.Commit();
        }
 
		private void CommonValidation(ProjectBackground projectBackground) {
        
		}

        private IProjectBackgroundUow ProjectBackgroundUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }

        private void BackGroundDetailRemove(int ProjectBackgroundId)
        {
            var LongTermObjectiveList = ProjectBackgroundUow.Repository<LongTermObjective>().FindBy(a => a.ProjectBackgroundId == ProjectBackgroundId);
            var BackgroundEventList = ProjectBackgroundUow.Repository<BackgroundEvent>().FindBy(a => a.ProjectBackgroundId == ProjectBackgroundId);

            foreach (LongTermObjective data in LongTermObjectiveList)
            {
                if (data.ProjectBackgroundId == ProjectBackgroundId)
                {
                    ProjectBackgroundUow.RegisterDeleted<LongTermObjective>(data);
                    ProjectBackgroundUow.Commit();
                }
            }
            foreach (BackgroundEvent data in BackgroundEventList)
            {
                if (data.ProjectBackgroundId == ProjectBackgroundId)
                {
                    ProjectBackgroundUow.RegisterDeleted<BackgroundEvent>(data);
                    ProjectBackgroundUow.Commit();
                }
            }
        }


    }
    public interface IProjectBackgroundDomain
    {
        HashSet<string> AddValidation(ProjectBackground projectBackground);
        HashSet<string> UpdateValidation(ProjectBackground projectBackground);
        HashSet<string> DeleteValidation(int id);
        ProjectBackground Add(ProjectBackground projectBackground);
        ProjectBackground Update(ProjectBackground projectBackground);
        void Delete(int id);
    }
}
