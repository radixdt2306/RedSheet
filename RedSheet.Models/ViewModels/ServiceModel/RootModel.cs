using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels.ServiceModel
{
    public class Reviewer
    {
        public object Id { get; set; }
        public object ApplicationProductTemplateModuleId { get; set; }
        public object ApplicationProductTemplateId { get; set; }
        public object UserId { get; set; }
        public string UserUniqueId { get; set; }
        public string Title { get; set; }
        public string Forename { get; set; }
        public string Middlename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public bool TemplateReviewerMustReview { get; set; }
        public object DateAdded { get; set; }
        public object AddedBySystemAdminUserId { get; set; }
        public object LastModifiedDate { get; set; }
    }


    public class Dependencies
    {
        public bool DependsOnAll { get; set; }
        public List<object> ProductModuleId { get; set; }
    }

    public class AssignedUser
    {
        public object Id { get; set; }
        public string UniqueId { get; set; }
        public string Title { get; set; }
        public string Forename { get; set; }
        public string Middlename { get; set; }
        public string Surname { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public object Telephone { get; set; }
        public object CompanyId { get; set; }
        public object LastModifiedDate { get; set; }
        public object Archived { get; set; }
    }

    public class ApplicationNote
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public bool IncludeInOutput { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class Module
    {
        public int Id { get; set; }
        public int ProductModuleId { get; set; }
        public bool ReviewPoint_Mandatory { get; set; }
        public bool ReviewPoint_Recommended { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string DisplayName { get; set; }
        public string ControllerName { get; set; }
        public string Description { get; set; }
        public bool AssignedUsers_AllMustContribute { get; set; }
        public bool AssignedUsers_AllMustAuthoriseClose { get; set; }
        public List<Reviewer> Reviewers { get; set; }
        public Dependencies Dependencies { get; set; }
        public List<AssignedUser> AssignedUsers { get; set; }
        public List<ApplicationNote> Notes { get; set; }
    }


    public class ProjectTemplate
    {
        public int Id { get; set; }
        public string UniqueId { get; set; }
        public string Name { get; set; }
        public bool AllowCustomization { get; set; }
        public bool IsStandardTemplate { get; set; }
        public List<object> Reportees { get; set; }
        public List<Reviewer> Reviewers { get; set; }
        public List<Module> Modules { get; set; }
        public List<ApplicationNote> Notes { get; set; }
    }
}
