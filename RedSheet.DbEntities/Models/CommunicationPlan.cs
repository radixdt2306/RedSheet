
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("CommunicationPlans", Schema = "dbo")]
    [Serializable]
    public partial class CommunicationPlan
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int CommunicationPlanId { get; set; }

        [Required]
        [MaxLength(100)]
        public string MediaMeans { get; set; }

        [Required]
        [MaxLength(200)]
        public string Message { get; set; }

        [Required]
        [MaxLength(50)]
        public string To { get; set; }

        [RelationshipTableAttribue("ProjectPreparations", "dbo")]
        //Relationships
        public int ProjectPreparationId { get; set; }

        [ForeignKey("ProjectPreparationId")]
        public ProjectPreparation ProjectPreparation { get; set; }

        public CommunicationPlan()
        {
        }

    }
}

