
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("OurRequirementDetails", Schema = "dbo")]
    [Serializable]
    public partial class OurRequirementDetail
    {

        [MaxLength(150)]
        public string FourStep { get; set; }

        [Required]
        [MaxLength(150)]
        public string ldo { get; set; }

        [Required]
        [MaxLength(150)]
        public string mdo { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int OurRequirementDetailId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Requirement { get; set; }

        [MaxLength(150)]
        public string SecondStep { get; set; }

        [MaxLength(150)]
        public string ThirdStep { get; set; }

        [RelationshipTableAttribue("ApplicationObjects", "dbo")]
        public PainFactor PainFactorId { get; set; }

        [RelationshipTableAttribue("ProjectRequirements", "dbo")]
        //Relationships
        public int ProjectRequirementId { get; set; }

        [ForeignKey("ProjectRequirementId")]
        public ProjectRequirement ProjectRequirement { get; set; }
        [InverseProperty("OurRequirementDetail")]
        public ICollection<ProjectZoma> ProjectZomas { get; set; }


        public OurRequirementDetail()
        {
            this.ProjectZomas = new HashSet<ProjectZoma>();

        }

    }
}

