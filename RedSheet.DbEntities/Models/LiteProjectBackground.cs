
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("LiteProjectBackgrounds", Schema = "dbo")]
    [Serializable]
    public partial class LiteProjectBackground
    {

        [Required]
        public System.DateTime DateOfNegotiation { get; set; }

        [Required]
        [MaxLength(200)]
        public string Focus { get; set; }

        [Required]
        [MaxLength(400)]
        public string KnowAboutThem { get; set; }

        [Required]
        [MaxLength(400)]
        public string KnownIssues { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LiteProjectBackgroundId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        [MaxLength(100)]
        public string OpponentName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Reason { get; set; }

        [Range(1, int.MaxValue)]
        public int ValueObjectiveId { get; set; }

        [RelationshipTableAttribue("LiteRelationshipRequires", "dbo")]
        //Relationships
        public int LiteRelationshipRequireId { get; set; }

        [ForeignKey("LiteRelationshipRequireId")]
        public LiteRelationshipRequire LiteRelationshipRequire { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }
        [InverseProperty("LiteProjectBackground")]
        public ICollection<LiteBackgroundCommunicationMode> LiteBackgroundCommunicationModes { get; set; }

        [InverseProperty("LiteProjectBackground")]
        public ICollection<LiteTheirTeamMember> LiteTheirTeamMembers { get; set; }

        [InverseProperty("LiteProjectBackground")]
        public ICollection<LiteTarget> LiteTargets { get; set; }

        [InverseProperty("LiteProjectBackground")]
        public ICollection<LiteOurTeamMember> LiteOurTeamMembers { get; set; }


        public LiteProjectBackground()
        {
            this.LiteBackgroundCommunicationModes = new HashSet<LiteBackgroundCommunicationMode>();

            this.LiteTheirTeamMembers = new HashSet<LiteTheirTeamMember>();

            this.LiteTargets = new HashSet<LiteTarget>();

            this.LiteOurTeamMembers = new HashSet<LiteOurTeamMember>();

        }

    }
}

