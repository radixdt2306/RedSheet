
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("KnowledgeGatheringPlans", Schema = "dbo")]
    [Serializable]
    public partial class KnowledgeGatheringPlan
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int KnowledgeGatheringPlanId { get; set; }

        [Required]
        [MaxLength(50)]
        public string KnowledgeGivenBy { get; set; }

        [Required]
        public System.DateTime KnowledgeGivenOn { get; set; }

        [Required]
        [MaxLength(250)]
        public string KnowledgeRequired { get; set; }

        [Required]
        [MaxLength(150)]
        public string Source { get; set; }

        [RelationshipTableAttribue("ProjectPowers", "dbo")]
        //Relationships
        public int ProjectPowerId { get; set; }

        [ForeignKey("ProjectPowerId")]
        public ProjectPower ProjectPower { get; set; }

        public KnowledgeGatheringPlan()
        {
        }

    }
}

