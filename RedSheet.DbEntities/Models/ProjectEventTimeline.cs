
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectEventTimelines", Schema = "dbo")]
    [Serializable]
    public partial class ProjectEventTimeline
    {

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        [MaxLength(10)]
        public string EventDuration { get; set; }

        [Required]
        public bool IsEndTimeFixed { get; set; }

        [Required]
        [MaxLength(200)]
        public string OpeningStatement { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectEventTimelineId { get; set; }

        [Required]
        [MaxLength(350)]
        public string RoomLayout { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }
        [InverseProperty("ProjectEventTimeline")]
        public ICollection<ArrivalAndOpeningTactic> ArrivalAndOpeningTactics { get; set; }

        [InverseProperty("ProjectEventTimeline")]
        public ICollection<EventAgendaTiming> EventAgendaTimings { get; set; }


        public ProjectEventTimeline()
        {
            this.ArrivalAndOpeningTactics = new HashSet<ArrivalAndOpeningTactic>();

            this.EventAgendaTimings = new HashSet<EventAgendaTiming>();

        }

    }
}

