using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System.Linq;
using System;

namespace RedSheet.Domain.ProjectRequirementModule
{
    public class TheirRequirementDetailDomain : ITheirRequirementDetailDomain
    {
        public TheirRequirementDetailDomain(IProjectRequirementUow projectRequirementUow, IApplicationUtility applicationUtility, IProjectRequirementDomain projectRequirementDomain)
        {
            ProjectRequirementUow = projectRequirementUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            ProjectRequirementDomain = projectRequirementDomain;
        }

        public HashSet<string> AddValidation(TheirRequirementDetail theirRequirementDetail)
        {
            CommonValidation(theirRequirementDetail);
            return ValidationMessages;
        }
        public TheirRequirementDetail Add(TheirRequirementDetail theirRequirementDetail)
        {
            if (theirRequirementDetail.ProjectRequirementId == 0)
            {
                var projectRequirement = new ProjectRequirement
                {
                    ProjectModuleId = theirRequirementDetail.ProjectModuleId,
                    RequirementCategoryId = RequirementCategory.TheirRequirement,

                    TheirRequirementDetails = new List<TheirRequirementDetail>
                    {
                        theirRequirementDetail
                    }
                };
                ProjectRequirementDomain.Add(projectRequirement);
            }
            else
            {
                ProjectRequirementUow.RegisterNew<TheirRequirementDetail>(theirRequirementDetail);
                ProjectRequirementUow.Commit();
            }
            return theirRequirementDetail;
        }

        public HashSet<string> UpdateValidation(TheirRequirementDetail theirRequirementDetail)
        {
            CommonValidation(theirRequirementDetail);
            return ValidationMessages;
        }

        public TheirRequirementDetail Update(TheirRequirementDetail theirRequirementDetail)
        {
            ProjectRequirementUow.RegisterDirty<TheirRequirementDetail>(theirRequirementDetail);
            ProjectRequirementUow.Commit();
            return theirRequirementDetail;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<TheirRequirementDetail>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var theirRequirementDetail = ProjectRequirementUow.Repository<TheirRequirementDetail>().FindByKey(id);
            ProjectRequirementUow.RegisterDeleted<TheirRequirementDetail>(theirRequirementDetail);
            ProjectRequirementUow.Commit();
        }


        public int GetMaxSortOrder(TheirRequirementDetail theirRequirementDetail)
        {
            int MaxSortOrder = 0;
            List<TheirRequirementDetail> lstTheirRequirement = ProjectRequirementUow.Repository<TheirRequirementDetail>().FindBy(a => a.ProjectRequirementId == theirRequirementDetail.ProjectRequirementId).ToList();
            if (lstTheirRequirement.Count > 0)
                MaxSortOrder = Convert.ToInt32(lstTheirRequirement.Max(a => a.SortOrder));
            return MaxSortOrder;

        }

        private void CommonValidation(TheirRequirementDetail theirRequirementDetail)
        {

        }

        private IProjectRequirementUow ProjectRequirementUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IProjectRequirementDomain ProjectRequirementDomain { get; set; }

    }
    public interface ITheirRequirementDetailDomain
    {
        HashSet<string> AddValidation(TheirRequirementDetail theirRequirementDetail);
        HashSet<string> UpdateValidation(TheirRequirementDetail theirRequirementDetail);
        HashSet<string> DeleteValidation(int id);
        TheirRequirementDetail Add(TheirRequirementDetail theirRequirementDetail);
        TheirRequirementDetail Update(TheirRequirementDetail theirRequirementDetail);
        void Delete(int id);
        int GetMaxSortOrder(TheirRequirementDetail theirRequirementDetail);
    }
}
