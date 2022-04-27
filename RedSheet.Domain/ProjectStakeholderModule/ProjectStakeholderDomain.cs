using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System.Linq;

namespace RedSheet.Domain.ProjectStakeholderModule
{
    public class ProjectStakeholderDomain : IProjectStakeholderDomain
    {
        public ProjectStakeholderDomain(IProjectStakeholderUow projectStakeholderUow, IApplicationUtility applicationUtility)
        {
            ProjectStakeholderUow = projectStakeholderUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectStakeholder projectStakeholder)
        {
            var stakeholderName = ProjectStakeholderUow.Repository<ProjectStakeholder>().SingleOrDefault(t => t.StakeholderName == projectStakeholder.StakeholderName && t.ProjectModuleId == projectStakeholder.ProjectModuleId);
            if (stakeholderName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(projectStakeholder);
            return ValidationMessages;
        }

        public ProjectStakeholder Add(ProjectStakeholder projectStakeholder)
        {
            ProjectStakeholderUow.RegisterNew<ProjectStakeholder>(projectStakeholder);
            ProjectStakeholderUow.Commit();
            return projectStakeholder;
        }
        public HashSet<string> UpdateValidation(ProjectStakeholder projectStakeholder)
        {
            var stakeholderName = ProjectStakeholderUow.Repository<ProjectStakeholder>().SingleOrDefault(t => t.StakeholderName == projectStakeholder.StakeholderName && t.ProjectStakeholderId != projectStakeholder.ProjectStakeholderId && t.ProjectModuleId == projectStakeholder.ProjectModuleId);
            if (stakeholderName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(projectStakeholder);
            return ValidationMessages;
        }

        public ProjectStakeholder Update(ProjectStakeholder projectStakeholder)
        {
            var stakeholderCommunicationModes = ProjectStakeholderUow.Repository<StakeholderCommunicationMode>().FindBy(t => t.ProjectStakeholderId == projectStakeholder.ProjectStakeholderId).ToList();
            stakeholderCommunicationModes.ForEach(t =>
            {
                ProjectStakeholderUow.RegisterDeleted<StakeholderCommunicationMode>(t);
            });
            ProjectStakeholderUow.Commit();
            ProjectStakeholderUow.Refresh();
            foreach (var stakeholderCommunicationMode in projectStakeholder.StakeholderCommunicationModes)
            {
                ProjectStakeholderUow.RegisterNew<StakeholderCommunicationMode>(stakeholderCommunicationMode);
            }
            projectStakeholder.StakeholderCommunicationModes = new List<StakeholderCommunicationMode>();
            ProjectStakeholderUow.Commit();
            ProjectStakeholderUow.Refresh();
            ProjectStakeholderUow.RegisterDirty<ProjectStakeholder>(projectStakeholder);
            ProjectStakeholderUow.Commit();
            return projectStakeholder;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            StakeholderCommunicationModeRemove(id);
            var isFailed = ApplicationUtility.CandDelete<ProjectStakeholder>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectStakeholder = ProjectStakeholderUow.Repository<ProjectStakeholder>().FindByKey(id);
            ProjectStakeholderUow.RegisterDeleted<ProjectStakeholder>(projectStakeholder);
            ProjectStakeholderUow.Commit();
        }
 
		private void CommonValidation(ProjectStakeholder projectStakeholder) {
        
		}

        private IProjectStakeholderUow ProjectStakeholderUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }

        private void StakeholderCommunicationModeRemove(int ProjectStakeholderId)
        {
            var stakeholderCommunicationModeList = ProjectStakeholderUow.Repository<StakeholderCommunicationMode>().FindBy(a=>a.ProjectStakeholderId == ProjectStakeholderId);
            
            foreach (StakeholderCommunicationMode data in stakeholderCommunicationModeList)
            {
                if (data.ProjectStakeholderId == ProjectStakeholderId)
                {
                    ProjectStakeholderUow.RegisterDeleted<StakeholderCommunicationMode>(data);
                    ProjectStakeholderUow.Commit();
                }
            }
        }
    }
    public interface IProjectStakeholderDomain
    {
        HashSet<string> AddValidation(ProjectStakeholder projectStakeholder);
        HashSet<string> UpdateValidation(ProjectStakeholder projectStakeholder);
        HashSet<string> DeleteValidation(int id);
        ProjectStakeholder Add(ProjectStakeholder projectStakeholder);
        ProjectStakeholder Update(ProjectStakeholder projectStakeholder);
        void Delete(int id);
    }
}
