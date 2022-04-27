using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectNegotionalityModule
{
    public class ProjectNegotionalityDomain : IProjectNegotionalityDomain
    {
        public ProjectNegotionalityDomain(IProjectUow projectUow, IProjectNegotionalityUow projectNegotionalityUow, IApplicationUtility applicationUtility)
        {
            ProjectUow = projectUow;
            ProjectNegotionalityUow = projectNegotionalityUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(ProjectNegotionality projectNegotionality)
        {
            CommonValidation(projectNegotionality);
            var negotionalityModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionality.ProjectModuleId);
            var cultureModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == negotionalityModuleData.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == cultureModuleData.ProjectModuleId);
            if (projectCultureData == null)
            {
                ValidationMessages.Add("Please enter culture details.");
            }
            return ValidationMessages;
        }

        public ProjectNegotionality Add(ProjectNegotionality projectNegotionality)
        {
            ProjectNegotionalityUow.RegisterNew<ProjectNegotionality>(projectNegotionality);
            ProjectNegotionalityUow.Commit();
            return projectNegotionality;
        }
        public HashSet<string> UpdateValidation(ProjectNegotionality projectNegotionality)
        {
			CommonValidation(projectNegotionality);
            var negotionalityModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionality.ProjectModuleId);
            var cultureModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == negotionalityModuleData.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == cultureModuleData.ProjectModuleId);
            if (projectCultureData == null)
            {
                ValidationMessages.Add("Please enter culture details.");
            }
            return ValidationMessages;
        }

        public ProjectNegotionality Update(ProjectNegotionality projectNegotionality)
        {
            ProjectNegotionalityUow.RegisterDirty<ProjectNegotionality>(projectNegotionality);
            ProjectNegotionalityUow.Commit();
            OurTeammemberRequireUpdate(projectNegotionality);
            return projectNegotionality;
        }
        public HashSet<string> DeleteValidation(int id)
        {
			var isFailed = ApplicationUtility.CandDelete<ProjectNegotionality>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectNegotionality = ProjectNegotionalityUow.Repository<ProjectNegotionality>().FindByKey(id);
            ProjectNegotionalityUow.RegisterDeleted<ProjectNegotionality>(projectNegotionality);
            ProjectNegotionalityUow.Commit();
        }
 
		private void CommonValidation(ProjectNegotionality projectNegotionality) {
        
		}

        private IProjectNegotionalityUow ProjectNegotionalityUow { get; set; }

        private IProjectUow ProjectUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }

        private void OurTeammemberRequireUpdate(ProjectNegotionality projectNegotionality)
        {
            var projectNegotionalityModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionality.ProjectModuleId);
            var projectCultureModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == projectNegotionalityModule.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == projectCultureModule.ProjectModuleId);
            var cultureData = ProjectUow.Repository<Culture>().FirstOrDefault(s => s.ProjectCultureId == projectCultureData.ProjectCultureId && s.CultureCategoryId == (int)CultureCategory.TheirCulture);
            //var CategoryId = 1;

            //if (projectNegotionality.IsMarketDifficult && projectNegotionality.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 1;
            //}
            //else if (!projectNegotionality.IsMarketDifficult && !projectNegotionality.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 2;
            //}
            //else if (!projectNegotionality.IsMarketDifficult && projectNegotionality.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 3;
            //}

            var ourTeamMembers = ProjectUow.Repository<OurTeamMember>().FindBy(t => t.ProjectNegotionalityId == projectNegotionality.ProjectNegotionalityId);
            foreach (var teamMember in ourTeamMembers)
            {
                TeamMemberRequireUpdate(projectNegotionality.NegotionalityCategoryId, cultureData.IsMonochronic, teamMember.OurTeamMemberId);
            }

        }

        private void TeamMemberRequireUpdate(NegotionalityCategory Category, bool IsMonochronic, int OurTeamMemberId)
        {
            OurTeamMemberRequire OurTeamMemberRequire;
            var OurTeamMemberRequireData = ProjectUow.Repository<OurTeamMemberRequire>().FirstOrDefault(t => t.OurTeamMemberId == OurTeamMemberId);
            switch (Category)
            {
                case NegotionalityCategory.Critical:
                    if (IsMonochronic)
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.High,
                            OutingId = Behaviour.High,
                            WIllToWinId = Behaviour.Low,
                            SolutionFocusedId = Behaviour.High,
                            OpenMindedId = Behaviour.High,
                            AgreeableId = Behaviour.High,
                            PersonalCalmId = Behaviour.High,
                            AssertivenessId = AssertivenessRequireBehaviour.Off,
                            ConflictStyleId = ConflictStyleBehviour.Accommodate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Essential,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    else
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.High,
                            OutingId = Behaviour.High,
                            WIllToWinId = Behaviour.Low,
                            SolutionFocusedId = Behaviour.High,
                            OpenMindedId = Behaviour.High,
                            AgreeableId = Behaviour.High,
                            PersonalCalmId = Behaviour.High,
                            AssertivenessId = AssertivenessRequireBehaviour.Off,
                            ConflictStyleId = ConflictStyleBehviour.Accommodate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Essential,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    ProjectNegotionalityUow.RegisterDirty<OurTeamMemberRequire>(OurTeamMemberRequire);
                    ProjectNegotionalityUow.Commit();
                    break;
                case NegotionalityCategory.Strategic:
                    if (IsMonochronic)
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.High,
                            OutingId = Behaviour.High,
                            WIllToWinId = Behaviour.Medium,
                            SolutionFocusedId = Behaviour.Medium,
                            OpenMindedId = Behaviour.High,
                            AgreeableId = Behaviour.High,
                            PersonalCalmId = Behaviour.High,
                            AssertivenessId = AssertivenessRequireBehaviour.Moderate,
                            ConflictStyleId = ConflictStyleBehviour.Collaborate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Essential,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    else
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.High,
                            OutingId = Behaviour.High,
                            WIllToWinId = Behaviour.Low,
                            SolutionFocusedId = Behaviour.Low,
                            OpenMindedId = Behaviour.High,
                            AgreeableId = Behaviour.High,
                            PersonalCalmId = Behaviour.High,
                            AssertivenessId = AssertivenessRequireBehaviour.Off,
                            ConflictStyleId = ConflictStyleBehviour.Collaborate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Essential,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    ProjectNegotionalityUow.RegisterDirty<OurTeamMemberRequire>(OurTeamMemberRequire);
                    ProjectNegotionalityUow.Commit();
                    break;
                case NegotionalityCategory.Acquisition:
                    if (IsMonochronic == true)
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.Medium,
                            OutingId = Behaviour.Low,
                            WIllToWinId = Behaviour.Medium,
                            SolutionFocusedId = Behaviour.High,
                            OpenMindedId = Behaviour.Medium,
                            AgreeableId = Behaviour.Low,
                            PersonalCalmId = Behaviour.Low,
                            AssertivenessId = AssertivenessRequireBehaviour.On,
                            ConflictStyleId = ConflictStyleBehviour.Compete,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Desirable,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    else
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.Medium,
                            OutingId = Behaviour.Medium,
                            WIllToWinId = Behaviour.Low,
                            SolutionFocusedId = Behaviour.Medium,
                            OpenMindedId = Behaviour.Medium,
                            AgreeableId = Behaviour.Medium,
                            PersonalCalmId = Behaviour.Medium,
                            AssertivenessId = AssertivenessRequireBehaviour.Off,
                            ConflictStyleId = ConflictStyleBehviour.Collaborate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Desirable,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    ProjectNegotionalityUow.RegisterDirty<OurTeamMemberRequire>(OurTeamMemberRequire);
                    ProjectNegotionalityUow.Commit();
                    break;
                case NegotionalityCategory.Leverage:
                    if (IsMonochronic == true)
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.Medium,
                            OutingId = Behaviour.Medium,
                            WIllToWinId = Behaviour.High,
                            SolutionFocusedId = Behaviour.Medium,
                            OpenMindedId = Behaviour.Low,
                            AgreeableId = Behaviour.Low,
                            PersonalCalmId = Behaviour.Low,
                            AssertivenessId = AssertivenessRequireBehaviour.On,
                            ConflictStyleId = ConflictStyleBehviour.Compete,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Desirable,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    else
                    {
                        OurTeamMemberRequire = new OurTeamMemberRequire()
                        {
                            ConsciousnessId = Behaviour.Medium,
                            OutingId = Behaviour.Medium,
                            WIllToWinId = Behaviour.Medium,
                            SolutionFocusedId = Behaviour.Low,
                            OpenMindedId = Behaviour.Medium,
                            AgreeableId = Behaviour.Medium,
                            PersonalCalmId = Behaviour.Medium,
                            AssertivenessId = AssertivenessRequireBehaviour.Off,
                            ConflictStyleId = ConflictStyleBehviour.Collaborate,
                            EmotionalCompetenceId = EmotionalRequireBehaviour.Essential,
                            OurTeamMemberId = OurTeamMemberId,
                            OurTeamMemberRequireId = OurTeamMemberRequireData.OurTeamMemberRequireId
                        };
                    }
                    ProjectNegotionalityUow.RegisterDirty<OurTeamMemberRequire>(OurTeamMemberRequire);
                    ProjectNegotionalityUow.Commit();
                    break;
            }
        }

    }
    public interface IProjectNegotionalityDomain
    {
        HashSet<string> AddValidation(ProjectNegotionality projectNegotionality);
        HashSet<string> UpdateValidation(ProjectNegotionality projectNegotionality);
        HashSet<string> DeleteValidation(int id);
        ProjectNegotionality Add(ProjectNegotionality projectNegotionality);
        ProjectNegotionality Update(ProjectNegotionality projectNegotionality);
        void Delete(int id);
    }
}
