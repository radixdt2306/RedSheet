
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("EventAgendaTimings", Schema = "dbo")]
    [Serializable]
    public partial class EventAgendaTiming
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int EventAgendaTimingId { get; set; }

        [Required]
        [MaxLength(200)]
        public string PayOff { get; set; }

        [Required]
        [MaxLength(200)]
        public string Process { get; set; }

        [Required]
        [MaxLength(200)]
        public string Purpose { get; set; }

        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        [Required]
        [MaxLength(200)]
        public string Topic { get; set; }

        [Required]
        [MaxLength(200)]
        public string Trigger { get; set; }

        [RelationshipTableAttribue("ApplicationObjects", "dbo")]
        public NegotiationPhase NegotiationPhaseId { get; set; }

        [RelationshipTableAttribue("ProjectEventTimelines", "dbo")]
        //Relationships
        public int ProjectEventTimelineId { get; set; }

        [ForeignKey("ProjectEventTimelineId")]
        public ProjectEventTimeline ProjectEventTimeline { get; set; }

        [RelationshipTableAttribue("Tactics", "dbo")]
        //Relationships
        public int TacticsId { get; set; }

        [ForeignKey("TacticsId")]
        public Tactic Tactic { get; set; }

        public EventAgendaTiming()
        {
        }

    }
}

