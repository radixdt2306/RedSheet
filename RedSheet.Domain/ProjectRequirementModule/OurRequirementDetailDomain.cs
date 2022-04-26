using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
namespace RedSheet.Domain.ProjectRequirementModule
{
    public class OurRequirementDetailDomain : IOurRequirementDetailDomain
    {
        public OurRequirementDetailDomain(IProjectRequirementUow projectRequirementUow, IApplicationUtility applicationUtility, IProjectRequirementDomain projectRequirementDomain)
        {
            ProjectRequirementUow = projectRequirementUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            ProjectRequirementDomain = projectRequirementDomain;
        }

        public HashSet<string> AddValidation(OurRequirementDetail ourRequirementDetail)
        {
            CommonValidation(ourRequirementDetail);
            return ValidationMessages;
        }

        public OurRequirementDetail Add(OurRequirementDetail ourRequirementDetail)
        {
            if (ourRequirementDetail.ProjectRequirementId == 0)
            {
                var projectRequirement = new ProjectRequirement
                {
                    ProjectModuleId = ourRequirementDetail.ProjectModuleId,
                    RequirementCategoryId = RequirementCategory.OurRequirement,
                    OurRequirementDetails = new List<OurRequirementDetail>
                    {
                        ourRequirementDetail
                    }
                };
                ProjectRequirementDomain.Add(projectRequirement);
            }
            else
            {
                ProjectRequirementUow.RegisterNew<OurRequirementDetail>(ourRequirementDetail);
                ProjectRequirementUow.Commit();
            }
            return ourRequirementDetail;
        }
        public HashSet<string> UpdateValidation(OurRequirementDetail ourRequirementDetail)
        {
            CommonValidation(ourRequirementDetail);
            return ValidationMessages;
        }

        public OurRequirementDetail Update(OurRequirementDetail ourRequirementDetail)
        {
            ProjectRequirementUow.RegisterDirty<OurRequirementDetail>(ourRequirementDetail);
            ProjectRequirementUow.Commit();
            return ourRequirementDetail;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<OurRequirementDetail>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var ourRequirementDetail = ProjectRequirementUow.Repository<OurRequirementDetail>().FindByKey(id);
            ProjectRequirementUow.RegisterDeleted<OurRequirementDetail>(ourRequirementDetail);
            ProjectRequirementUow.Commit();
        }

        private void CommonValidation(OurRequirementDetail ourRequirementDetail)
        {

        }

        private IProjectRequirementUow ProjectRequirementUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IProjectRequirementDomain ProjectRequirementDomain { get; set; }
    }
    public interface IOurRequirementDetailDomain
    {
        HashSet<string> AddValidation(OurRequirementDetail ourRequirementDetail);
        HashSet<string> UpdateValidation(OurRequirementDetail ourRequirementDetail);
        HashSet<string> DeleteValidation(int id);
        OurRequirementDetail Add(OurRequirementDetail ourRequirementDetail);
        OurRequirementDetail Update(OurRequirementDetail ourRequirementDetail);
        void Delete(int id);
    }
}
