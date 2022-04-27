
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectPreparations", Schema = "dbo")]
    [Serializable]
    public partial class ProjectPreparation
    {

        [Required]
        [MaxLength(400)]
        public string ElevatorSpeech { get; set; }

        [Required]
        [MaxLength(400)]
        public string PreConditioningMessage { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectPreparationId { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }
        [InverseProperty("ProjectPreparation")]
        public ICollection<CommunicationPlan> CommunicationPlans { get; set; }

        [InverseProperty("ProjectPreparation")]
        public ICollection<EventPlanningAction> EventPlanningActions { get; set; }


        public ProjectPreparation()
        {
            this.CommunicationPlans = new HashSet<CommunicationPlan>();

            this.EventPlanningActions = new HashSet<EventPlanningAction>();

        }

    }
}

