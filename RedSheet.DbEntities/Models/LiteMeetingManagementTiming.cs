
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("LiteMeetingManagementTimings", Schema = "dbo")]
    [Serializable]
    public partial class LiteMeetingManagementTiming
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LiteMeetingManagementTimingId { get; set; }

        [Required]
        [MaxLength(400)]
        public string Process { get; set; }

        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        [RelationshipTableAttribue("LiteMeetingManagements", "dbo")]
        //Relationships
        public int LiteMeetingManagementId { get; set; }

        [ForeignKey("LiteMeetingManagementId")]
        public LiteMeetingManagement LiteMeetingManagement { get; set; }

        [RelationshipTableAttribue("ApplicationObjects", "dbo")]
        public NegotiationPhase NegotiationPhaseId { get; set; }

        [RelationshipTableAttribue("Tactics", "dbo")]
        //Relationships
        public int TacticId { get; set; }

        [ForeignKey("TacticId")]
        public Tactic Tactic { get; set; }

        public LiteMeetingManagementTiming()
        {
        }

    }
}

