
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("TheirRequirementDetails", Schema = "dbo")]
    [Serializable]
    public partial class TheirRequirementDetail
    {

        [Required]
        [MaxLength(150)]
        public string ldo { get; set; }

        [Required]
        [MaxLength(150)]
        public string mdo { get; set; }

        [Required]
        [MaxLength(150)]
        public string Requirement { get; set; }

        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int TheirRequirementDetailId { get; set; }

        [RelationshipTableAttribue("ProjectRequirements", "dbo")]
        //Relationships
        public int ProjectRequirementId { get; set; }

        [ForeignKey("ProjectRequirementId")]
        public ProjectRequirement ProjectRequirement { get; set; }
        [InverseProperty("TheirRequirementDetail")]
        public ICollection<ProjectZoma> ProjectZomas { get; set; }


        public TheirRequirementDetail()
        {
            this.ProjectZomas = new HashSet<ProjectZoma>();

        }

    }
}

