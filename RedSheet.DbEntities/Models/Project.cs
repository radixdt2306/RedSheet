
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("Projects", Schema = "dbo")]
    [Serializable]
    public partial class Project
    {

        public Nullable<int> CreatedBy { get; set; }

        public Nullable<System.DateTime> CreatedOn { get; set; }

        [Required]
        public bool IsAllowCustomization { get; set; }

        [Required]
        public bool IsClosed { get; set; }

        [Required]
        public bool IsStarted { get; set; }

        public Nullable<int> ModuleIdReached { get; set; }

        [Range(1, int.MaxValue)]
        public int NoOfDays { get; set; }

        [Range(1, int.MaxValue)]
        public int OwnerId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(200)]
        public string ProjectName { get; set; }

        [MaxLength(1000)]
        public string ProjectNote { get; set; }

        public Nullable<System.DateTime> PublishDate { get; set; }

        [MaxLength(200)]
        public string ReporteeName { get; set; }

        [Required]
        public bool Status { get; set; }

        [Range(1, int.MaxValue)]
        public int TemplateId { get; set; }

        [Required]
        [MaxLength(200)]
        public string TemplateName { get; set; }

        public Nullable<int> UpdatedBy { get; set; }

        public Nullable<System.DateTime> UpdatedOn { get; set; }

        [RelationshipTableAttribue("ApplicationObjects", "dbo")]
        public NegotiationRole NegotiationRoleId { get; set; }

        [Required]
        [RelationshipTableAttribue("TemplateGroups", "dbo")]
        //Relationships
        public Guid TemplateGroupId { get; set; }

        [ForeignKey("TemplateGroupId")]
        public TemplateGroup TemplateGroup { get; set; }
        [InverseProperty("Project")]
        public ICollection<ProjectModule> ProjectModules { get; set; }

        [InverseProperty("Project")]
        public ICollection<ProjectModuleAssigneesOrReviewer> ProjectModuleAssigneesOrReviewers { get; set; }

        [InverseProperty("Project")]
        public ICollection<RecentActivityAndNotification> RecentActivityAndNotifications { get; set; }

        public Project()
        {
            this.ProjectModules = new HashSet<ProjectModule>();

            this.RecentActivityAndNotifications = new HashSet<RecentActivityAndNotification>();

            this.ProjectModuleAssigneesOrReviewers = new HashSet<ProjectModuleAssigneesOrReviewer>();
        }
    }
}

