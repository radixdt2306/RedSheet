
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("LiteTheirTeamMembers", Schema = "dbo")]
    [Serializable]
    public partial class LiteTheirTeamMember
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LiteTheirTeamMemberId { get; set; }

        [Required]
        [MaxLength(50)]
        public string LiteTheirTeamMemberName { get; set; }

        [Range(1, int.MaxValue)]
        public int PersonalityId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Position { get; set; }

        [RelationshipTableAttribue("LiteProjectBackgrounds", "dbo")]
        //Relationships
        public int LiteProjectBackgroundId { get; set; }

        [ForeignKey("LiteProjectBackgroundId")]
        public LiteProjectBackground LiteProjectBackground { get; set; }

        public LiteTheirTeamMember()
        {
        }

    }
}

