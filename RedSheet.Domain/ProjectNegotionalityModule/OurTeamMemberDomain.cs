using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectNegotionalityModule
{
    public class OurTeamMemberDomain : IOurTeamMemberDomain
    {
        public OurTeamMemberDomain(IProjectUow projectUow, IProjectNegotionalityUow projectNegotionalityUow, IApplicationUtility applicationUtility)
        {
            ProjectUow = projectUow;
            ProjectNegotionalityUow = projectNegotionalityUow;
			ApplicationUtility = applicationUtility;
			ValidationMessages = new HashSet<string>();
        }

        public HashSet<string> AddValidation(OurTeamMember ourTeamMember)
        {
            var ourTeamMemberName = ProjectNegotionalityUow.Repository<OurTeamMember>().SingleOrDefault(t => t.UserId == ourTeamMember.UserId && t.ProjectNegotionalityId == ourTeamMember.ProjectNegotionalityId);
            if (ourTeamMemberName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(ourTeamMember);
            var projectNegotionalityData = ProjectNegotionalityUow.Repository<ProjectNegotionality>().FirstOrDefault(x => x.ProjectNegotionalityId == ourTeamMember.ProjectNegotionalityId);
            var negotionalityModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionalityData.ProjectModuleId);
            var cultureModuleData = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == negotionalityModuleData.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == cultureModuleData.ProjectModuleId);
            if (projectCultureData == null)
            {
                ValidationMessages.Add("Please enter culture details.");
            }
 
            return ValidationMessages;
        }

        public OurTeamMember Add(OurTeamMember ourTeamMember)
        {
            ProjectNegotionalityUow.RegisterNew<OurTeamMember>(ourTeamMember);
            ProjectNegotionalityUow.Commit();
            OurTeammemberRequireAdd(ourTeamMember);
            return ourTeamMember;
        }
        public HashSet<string> UpdateValidation(OurTeamMember ourTeamMember)
        {
            CommonValidation(ourTeamMember);
           return ValidationMessages;
        }

        public OurTeamMember Update(OurTeamMember ourTeamMember)
        {
         
            if (ourTeamMember.OurTeamMemberBehaviours.Count > 0)
            {
                ProjectNegotionalityUow.RegisterDirty<OurTeamMember>(ourTeamMember);
                foreach (var ourTeamMemberBehaviour in ourTeamMember.OurTeamMemberBehaviours)
                {                                                                                                                                                                                   
                    ProjectNegotionalityUow.RegisterDirty<OurTeamMemberBehaviour>(ourTeamMemberBehaviour);
                }
                ProjectNegotionalityUow.Commit();
            }
            return ourTeamMember;
        }

        public HashSet<string> DeleteValidation(int id)
        {
            OurTeamMemberBehaviourRequireRemove(id);
            var isFailed = ApplicationUtility.CandDelete<OurTeamMember>(id, true);
            if (isFailed) {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted,true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var ourTeamMember = ProjectNegotionalityUow.Repository<OurTeamMember>().FindByKey(id);
            ProjectNegotionalityUow.RegisterDeleted<OurTeamMember>(ourTeamMember);
            ProjectNegotionalityUow.Commit();
        }
 
		private void CommonValidation(OurTeamMember ourTeamMember) {
        
		}

        private IProjectNegotionalityUow ProjectNegotionalityUow { get; set; }

        private IProjectUow ProjectUow { get; set; }

		private IApplicationUtility ApplicationUtility { get; set; }

		private HashSet<string> ValidationMessages { get; set; }

        private void OurTeammemberRequireAdd(OurTeamMember ourTeamMember)
        {
            var projectNegotionalityData = ProjectNegotionalityUow.Repository<ProjectNegotionality>().FirstOrDefault(x => x.ProjectNegotionalityId == ourTeamMember.ProjectNegotionalityId);
            var projectNegotionalityModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionalityData.ProjectModuleId);
            var projectCultureModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(a => a.ProjectId == projectNegotionalityModule.ProjectId && a.TemplateModuleId == (int)ModuleName.Culture);
            var projectCultureData = ProjectUow.Repository<ProjectCulture>().FirstOrDefault(d => d.ProjectModuleId == projectCultureModule.ProjectModuleId);
            var cultureData = ProjectUow.Repository<Culture>().FirstOrDefault(s => s.ProjectCultureId == projectCultureData.ProjectCultureId && s.CultureCategoryId == (int)CultureCategory.TheirCulture);
            //var CategoryId = 1;

            //if (projectNegotionalityData.IsMarketDifficult && projectNegotionalityData.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 1;
            //}
            //else if (!projectNegotionalityData.IsMarketDifficult && !projectNegotionalityData.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 2;
            //}
            //else if (!projectNegotionalityData.IsMarketDifficult && projectNegotionalityData.IsSpendLarge)
            //{
            //    CategoryId = CategoryId + 3;
            //}            
            TeamMemberRequire(projectNegotionalityData.NegotionalityCategoryId, cultureData.IsMonochronic, ourTeamMember.OurTeamMemberId);

        }
        private void TeamMemberRequire(NegotionalityCategory CategoryId, bool IsMonochronic, int OurTeamMemberId)
        {
            OurTeamMemberRequire OurTeamMemberRequire;
            switch (CategoryId)
            {
                case NegotionalityCategory.Critical:
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
                        OurTeamMemberId = OurTeamMemberId
                    };
                    ProjectNegotionalityUow.RegisterNew<OurTeamMemberRequire>(OurTeamMemberRequire);
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
                            OurTeamMemberId = OurTeamMemberId
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
                            OurTeamMemberId = OurTeamMemberId
                        };
                    }
                    ProjectNegotionalityUow.RegisterNew<OurTeamMemberRequire>(OurTeamMemberRequire);
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
                            OurTeamMemberId = OurTeamMemberId
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
                            OurTeamMemberId = OurTeamMemberId
                        };
                    }
                    ProjectNegotionalityUow.RegisterNew<OurTeamMemberRequire>(OurTeamMemberRequire);
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
                            OurTeamMemberId = OurTeamMemberId
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
                            OurTeamMemberId = OurTeamMemberId
                        };
                    }
                    ProjectNegotionalityUow.RegisterNew<OurTeamMemberRequire>(OurTeamMemberRequire);
                    ProjectNegotionalityUow.Commit();
                    break;
            }
        }
        private void OurTeamMemberBehaviourRemove(int OurTeamMemberId)
        {
            var ourTeamMemberBehaviour = ProjectNegotionalityUow.Repository<OurTeamMemberBehaviour>().FirstOrDefault(t => t.OurTeamMemberId == OurTeamMemberId);
            ProjectNegotionalityUow.RegisterDeleted<OurTeamMemberBehaviour>(ourTeamMemberBehaviour);
            ProjectNegotionalityUow.Commit();
        }
        private void OurTeamMemberBehaviourRequireRemove(int OurTeamMemberId)
        {
            var ourTeamMemberBehaviour = ProjectNegotionalityUow.Repository<OurTeamMemberBehaviour>().FirstOrDefault(t => t.OurTeamMemberId == OurTeamMemberId);
            ProjectNegotionalityUow.RegisterDeleted<OurTeamMemberBehaviour>(ourTeamMemberBehaviour);
            var ourTeamMemberRequire = ProjectNegotionalityUow.Repository<OurTeamMemberRequire>().FirstOrDefault(t => t.OurTeamMemberId == OurTeamMemberId);
            ProjectNegotionalityUow.RegisterDeleted<OurTeamMemberRequire>(ourTeamMemberRequire);
            ProjectNegotionalityUow.Commit();
        }

    }
    public interface IOurTeamMemberDomain
    {
        HashSet<string> AddValidation(OurTeamMember ourTeamMember);
        HashSet<string> UpdateValidation(OurTeamMember ourTeamMember);
        HashSet<string> DeleteValidation(int id);
        OurTeamMember Add(OurTeamMember ourTeamMember);
        OurTeamMember Update(OurTeamMember ourTeamMember);
        void Delete(int id);
    }
}
