using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectCultureModule
{
    public class ProjectCultureDomain : IProjectCultureDomain
    {
        public ProjectCultureDomain(IProjectCultureUow projectCultureUow, IApplicationUtility applicationUtility, IProjectCulturePlanUow projectCulturePlanUow)
        {
            ProjectCultureUow = projectCultureUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            ProjectCulturePlanUow = projectCulturePlanUow;
        }

        public HashSet<string> AddValidation(ProjectCulture projectCulture)
        {
            CommonValidation(projectCulture);
            return ValidationMessages;
        }

        public ProjectCulture Add(ProjectCulture projectCulture)
        {
            ProjectCultureUow.RegisterNew<ProjectCulture>(projectCulture);
            ProjectCultureUow.Commit();
            AddProjectCulturePlan(projectCulture.ProjectCultureId, projectCulture.ProjectModuleId);
            return projectCulture;
        }
        public HashSet<string> UpdateValidation(ProjectCulture projectCulture)
        {
            CommonValidation(projectCulture);
            return ValidationMessages;
        }

        public ProjectCulture Update(ProjectCulture projectCulture)
        {
            if (projectCulture.Cultures.Count > 0)
            {
                ProjectCultureUow.RegisterDirty<ProjectCulture>(projectCulture);
                foreach (var data in projectCulture.Cultures)
                {
                    if (data.CultureId > 0)
                    {
                        ProjectCultureUow.RegisterDirty<Culture>(data);
                    }
                    else
                    {
                        var cultureData = ProjectCultureUow.Repository<Culture>().SingleOrDefault(t => t.ProjectCultureId == projectCulture.ProjectCultureId && t.CultureCategoryId == data.CultureCategoryId);
                        data.CultureId = cultureData.CultureId;
                        data.ProjectCultureId = cultureData.ProjectCultureId;
                        ProjectCultureUow.RegisterDirty<Culture>(data);
                    }
                }
                ProjectCultureUow.Commit();
                RemoveProjectCulturePlan(projectCulture.ProjectModuleId);
                AddProjectCulturePlan(projectCulture.ProjectCultureId, projectCulture.ProjectModuleId);
            }
            return projectCulture;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<ProjectCulture>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            CulturesRemove(id);
            var projectCulture = ProjectCultureUow.Repository<ProjectCulture>().FindByKey(id);
            ProjectCultureUow.RegisterDeleted<ProjectCulture>(projectCulture);
            ProjectCultureUow.Commit();
        }

        private void CommonValidation(ProjectCulture projectCulture)
        {

        }

        private IProjectCultureUow ProjectCultureUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IProjectCulturePlanUow ProjectCulturePlanUow { get; set; }

        private void CulturesRemove(int projectCultureId)
        {
            var cultureList = ProjectCultureUow.Repository<Culture>().FindBy(a => a.ProjectCultureId == projectCultureId);

            foreach (Culture data in cultureList)
            {
                if (data.ProjectCultureId == projectCultureId)
                {
                    ProjectCultureUow.RegisterDeleted<Culture>(data);
                }
            }
            ProjectCultureUow.Commit();
        }
        private void AddProjectCulturePlan(int ProjectCultureId, int ProjectModuleId)
        {
            var cultureModuleData = ProjectCultureUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindByKey(ProjectModuleId);
            var culturePlanModuleData = ProjectCultureUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == cultureModuleData.ProjectId && t.TemplateModuleId == (int)ModuleName.CulturePlan);
            var cultureData = ProjectCultureUow.Repository<Culture>().FirstOrDefault(a => a.ProjectCultureId == ProjectCultureId && a.CultureCategoryId == (int)CultureCategory.TheirCulture);

            var projectModuleId = culturePlanModuleData.ProjectModuleId;
           var cultureCount= ProjectCulturePlanUow.Repository<CulturePlan>().Count(t => t.CultureCountryId == cultureData.CountryId);
          
           var culturePlanData = ProjectCulturePlanUow.Repository<CulturePlan>().FindBy(t => t.CultureCountryId == cultureData.CountryId);
            if (cultureCount != 0)
            {
                foreach (var item in culturePlanData)
                {
                    var ProjectCulturePlan = new ProjectCulturePlan()
                    {
                        ProjectModuleId = projectModuleId,
                        CulturePlanId = item.CulturePlanId,
                        CulturePlanCategoryId = item.CulturePlanCategoryId,
                        ProjectCulturePlanValue = item.CulturePlanValue
                    };
                    ProjectCulturePlanUow.RegisterNew<ProjectCulturePlan>(ProjectCulturePlan);

                }
            }
                ProjectCulturePlanUow.Commit();
        }

        private void RemoveProjectCulturePlan(int ProjectModuleId)
        {
            var cultureModuleData = ProjectCultureUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindByKey(ProjectModuleId);
            var culturePlanModuleData = ProjectCultureUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == cultureModuleData.ProjectId && t.TemplateModuleId == (int)ModuleName.CulturePlan);
            var culturePlanList = ProjectCulturePlanUow.Repository<ProjectCulturePlan>().FindBy(x => x.ProjectModuleId == culturePlanModuleData.ProjectModuleId && x.CulturePlanId != null);
                foreach (var data in culturePlanList)
            {
                if (data.ProjectModuleId == culturePlanModuleData.ProjectModuleId)
                {
                    ProjectCulturePlanUow.RegisterDeleted<ProjectCulturePlan>(data);
                }
            }
            ProjectCulturePlanUow.Commit();
        }
    }

    public interface IProjectCultureDomain
    {
        HashSet<string> AddValidation(ProjectCulture projectCulture);
        HashSet<string> UpdateValidation(ProjectCulture projectCulture);
        HashSet<string> DeleteValidation(int id);
        ProjectCulture Add(ProjectCulture projectCulture);
        ProjectCulture Update(ProjectCulture projectCulture);
        void Delete(int id);
    }
}
