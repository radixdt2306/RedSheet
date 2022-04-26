
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("LiteMeetingManagements", Schema = "dbo")]
    [Serializable]
    public partial class LiteMeetingManagement
    {

        [Required]
        [MaxLength(400)]
        public string IntangiblePowerPlan { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LiteMeetingManagementId { get; set; }

        [Required]
        [MaxLength(200)]
        public string OpeningStatement { get; set; }

        [Required]
        [MaxLength(400)]
        public string PreMeetingConditioning { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }
        [InverseProperty("LiteMeetingManagement")]
        public ICollection<LiteMeetingManagementTiming> LiteMeetingManagementTimings { get; set; }

        [InverseProperty("LiteMeetingManagement")]
        public ICollection<LiteEventPlanningAction> LiteEventPlanningActions { get; set; }

        [InverseProperty("LiteMeetingManagement")]
        public ICollection<LiteMeetingPlanning> LiteMeetingPlannings { get; set; }


        public LiteMeetingManagement()
        {
            this.LiteMeetingManagementTimings = new HashSet<LiteMeetingManagementTiming>();

            this.LiteEventPlanningActions = new HashSet<LiteEventPlanningAction>();

            this.LiteMeetingPlannings = new HashSet<LiteMeetingPlanning>();

        }

    }
}

