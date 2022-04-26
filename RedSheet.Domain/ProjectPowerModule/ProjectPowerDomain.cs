using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectPowerModule
{
    public class ProjectPowerDomain : IProjectPowerDomain
    {
        public ProjectPowerDomain(IProjectPowerUow projectPowerUow, IApplicationUtility applicationUtility)
        {
            ProjectPowerUow = projectPowerUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectPower projectPower)
        {
            CommonValidation(projectPower);
            return ValidationMessages;
        }

        public ProjectPower Add(ProjectPower projectPower)
        {
            ProjectPowerUow.RegisterNew<ProjectPower>(projectPower);
            ProjectPowerUow.Commit();
			return projectPower;
        }
        public HashSet<string> UpdateValidation(ProjectPower projectPower)
        {
			CommonValidation(projectPower);
           return ValidationMessages;
        }

        public ProjectPower Update(ProjectPower projectPower)
        {
			if (projectPower.PowerTypeDetails.Count > 0)
			{
				ProjectPowerUow.RegisterDirty<ProjectPower>(projectPower);
				foreach (var data in projectPower.PowerTypeDetails)
				{
					if (data.PowerTypeDetailId > 0)
					{
						ProjectPowerUow.RegisterDirty<PowerTypeDetail>(data);
					}
					else
					{                          
						var powerTypeData = ProjectPowerUow.Repository<PowerTypeDetail>().SingleOrDefault(t => t.ProjectPowerId == data.ProjectPowerId  && t.PowerTypeId == data.PowerTypeId);
						data.PowerTypeDetailId = powerTypeData.PowerTypeDetailId;
						data.ProjectPowerId = powerTypeData.ProjectPowerId;
						ProjectPowerUow.RegisterDirty<PowerTypeDetail>(data);
					}
				}
				ProjectPowerUow.Commit();
			}
			//PowerTypeDetailRemove(projectPower.ProjectPowerId);
			//ProjectPowerUow.RegisterDirty<ProjectPower>(projectPower);
			//ProjectPowerUow.Commit();
            return projectPower;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            
            var isFailed = ApplicationUtility.CandDelete<ProjectPower>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
			PowerTypeDetailRemove(id);
			var projectPower = ProjectPowerUow.Repository<ProjectPower>().FindByKey(id);
            ProjectPowerUow.RegisterDeleted<ProjectPower>(projectPower);
            ProjectPowerUow.Commit();
        }
 
		private void CommonValidation(ProjectPower projectPower) {
        
		}
        private void PowerTypeDetailRemove(int ProjectPowerId)
        {
            var powerTypeDetailList = ProjectPowerUow.Repository<PowerTypeDetail>().FindBy(a => a.ProjectPowerId == ProjectPowerId);

            foreach (PowerTypeDetail data in powerTypeDetailList)
            {
                if (data.ProjectPowerId == ProjectPowerId)
                {
                    ProjectPowerUow.RegisterDeleted<PowerTypeDetail>(data);
                    
                }
            }
			ProjectPowerUow.Commit();
		}
		

		private IProjectPowerUow ProjectPowerUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }
        
    }
    public interface IProjectPowerDomain
    {
        HashSet<string> AddValidation(ProjectPower projectPower);
        HashSet<string> UpdateValidation(ProjectPower projectPower);
        HashSet<string> DeleteValidation(int id);
        ProjectPower Add(ProjectPower projectPower);
        ProjectPower Update(ProjectPower projectPower);
        void Delete(int id);
    }
}
