
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("LiteEventPlanningActions", Schema = "dbo")]
    [Serializable]
    public partial class LiteEventPlanningAction
    {

        [Required]
        [MaxLength(100)]
        public string LiteEventPlanningActionBy { get; set; }

        [Required]
        [MaxLength(200)]
        public string LiteEventPlanningActionDetail { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LiteEventPlanningActionId { get; set; }

        [Required]
        public System.DateTime LiteEventPlanningActionOn { get; set; }

        [RelationshipTableAttribue("LiteMeetingManagements", "dbo")]
        //Relationships
        public int LiteMeetingManagementId { get; set; }

        [ForeignKey("LiteMeetingManagementId")]
        public LiteMeetingManagement LiteMeetingManagement { get; set; }

        public LiteEventPlanningAction()
        {
        }

    }
}

