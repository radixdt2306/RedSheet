
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("NanoDiscussionSequences", Schema = "dbo")]
    [Serializable]
    public partial class NanoDiscussionSequence
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int NanoDiscussionSequenceId { get; set; }

        [Required]
        [MaxLength(400)]
        public string Process { get; set; }

        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        [RelationshipTableAttribue("ApplicationObjects", "dbo")]
        public NegotiationPhase NegotiationPhaseId { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }

        [RelationshipTableAttribue("Tactics", "dbo")]
        //Relationships
        public int TacticId { get; set; }

        [ForeignKey("TacticId")]
        public Tactic Tactic { get; set; }

        public NanoDiscussionSequence()
        {
        }

    }
}

