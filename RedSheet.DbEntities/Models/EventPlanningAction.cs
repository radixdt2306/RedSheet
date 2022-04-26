
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("EventPlanningActions", Schema = "dbo")]
    [Serializable]
    public partial class EventPlanningAction
    {

        [Required]
        [MaxLength(50)]
        public string EventPlanningActionBy { get; set; }

        [Required]
        [MaxLength(400)]
        public string EventPlanningActionDetail { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int EventPlanningActionId { get; set; }

        [Required]
        public System.DateTime EventPlanningActionOn { get; set; }

        [RelationshipTableAttribue("ProjectPreparations", "dbo")]
        //Relationships
        public int ProjectPreparationId { get; set; }

        [ForeignKey("ProjectPreparationId")]
        public ProjectPreparation ProjectPreparation { get; set; }

        public EventPlanningAction()
        {
        }

    }
}

