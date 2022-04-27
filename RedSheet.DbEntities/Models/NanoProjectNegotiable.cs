
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("NanoProjectNegotiables", Schema = "dbo")]
    [Serializable]
    public partial class NanoProjectNegotiable
    {

        [Required]
        [MaxLength(150)]
        public string ldo { get; set; }

        [Required]
        [MaxLength(150)]
        public string mdo { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int NanoProjectNegotiableId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Requirement { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }

        public NanoProjectNegotiable()
        {
        }

    }
}

