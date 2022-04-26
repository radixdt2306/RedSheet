
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectModules", Schema = "dbo")]
    [Serializable]
    public partial class ProjectModule
    {

        [Range(0, int.MaxValue)]
        public int BaseId { get; set; }

        [Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }

        [Required]
        public System.DateTime CreatedOn { get; set; }

        [Range(0, int.MaxValue)]
        public int DependantModuleId { get; set; }

        [Required]
        public string HTMLHelp { get; set; }

        [Required]
        public bool IsClosed { get; set; }

        [Required]
        public bool IsVisited { get; set; }

        [Range(1, int.MaxValue)]
        public int ModuleOrder { get; set; }

        public string Note { get; set; }

        public string OwnerNote { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectModuleId { get; set; }

        [Required]
        public bool Status { get; set; }

        [Range(1, int.MaxValue)]
        public int TemplateModuleId { get; set; }

        [Required]
        [MaxLength(200)]
        public string TemplateModuleName { get; set; }

        public Nullable<int> UpdatedBy { get; set; }

        public Nullable<System.DateTime> UpdatedOn { get; set; }

        [RelationshipTableAttribue("Projects", "dbo")]
        //Relationships
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        [InverseProperty("ProjectModule")]
        public ICollection<ProjectNegotiation> ProjectNegotiations { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectCulture> ProjectCultures { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectOutcomeAndLearning> ProjectOutcomeAndLearnings { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<NanoDiscussionSequence> NanoDiscussionSequences { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<NanoTheirBatna> NanoTheirBatnas { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<NanoOurBatna> NanoOurBatnas { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectPower> ProjectPowers { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectGameDetail> ProjectGameDetails { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<RecentActivityAndNotification> RecentActivityAndNotifications { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectNegotionality> ProjectNegotionalities { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectModuleReview> ProjectModuleReviews { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectPreparation> ProjectPreparations { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<LiteMeetingManagement> LiteMeetingManagements { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectZoma> ProjectZomas { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectRequirement> ProjectRequirements { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<LiteProjectBackground> LiteProjectBackgrounds { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectPostEventAction> ProjectPostEventActions { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectModuleReviewer> ProjectModuleReviewers { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectModuleAssignee> ProjectModuleAssignees { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<NanoProjectNegotiable> NanoProjectNegotiables { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectBackground> ProjectBackgrounds { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectCarryForward> ProjectCarryForwards { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<NanoScopeToNegotiateObjective> NanoScopeToNegotiateObjectives { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectEventTimeline> ProjectEventTimelines { get; set; }

        [InverseProperty("ProjectModule")]
        public ICollection<ProjectStakeholder> ProjectStakeholders { get; set; }


        public ProjectModule()
        {
            this.ProjectNegotiations = new HashSet<ProjectNegotiation>();

            this.ProjectCultures = new HashSet<ProjectCulture>();

            this.ProjectOutcomeAndLearnings = new HashSet<ProjectOutcomeAndLearning>();

            this.NanoDiscussionSequences = new HashSet<NanoDiscussionSequence>();

            this.NanoTheirBatnas = new HashSet<NanoTheirBatna>();

            this.NanoOurBatnas = new HashSet<NanoOurBatna>();

            this.ProjectPowers = new HashSet<ProjectPower>();

            this.ProjectGameDetails = new HashSet<ProjectGameDetail>();

            this.RecentActivityAndNotifications = new HashSet<RecentActivityAndNotification>();

            this.ProjectNegotionalities = new HashSet<ProjectNegotionality>();

            this.ProjectModuleReviews = new HashSet<ProjectModuleReview>();

            this.ProjectPreparations = new HashSet<ProjectPreparation>();

            this.LiteMeetingManagements = new HashSet<LiteMeetingManagement>();

            this.ProjectZomas = new HashSet<ProjectZoma>();

            this.ProjectRequirements = new HashSet<ProjectRequirement>();

            this.LiteProjectBackgrounds = new HashSet<LiteProjectBackground>();

            this.ProjectPostEventActions = new HashSet<ProjectPostEventAction>();

            this.ProjectModuleReviewers = new HashSet<ProjectModuleReviewer>();

            this.ProjectModuleAssignees = new HashSet<ProjectModuleAssignee>();

            this.NanoProjectNegotiables = new HashSet<NanoProjectNegotiable>();

            this.ProjectBackgrounds = new HashSet<ProjectBackground>();

            this.ProjectCarryForwards = new HashSet<ProjectCarryForward>();

            this.NanoScopeToNegotiateObjectives = new HashSet<NanoScopeToNegotiateObjective>();

            this.ProjectEventTimelines = new HashSet<ProjectEventTimeline>();

            this.ProjectStakeholders = new HashSet<ProjectStakeholder>();

        }

    }
}

