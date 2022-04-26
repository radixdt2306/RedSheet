
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectCultures", Schema = "dbo")]
    [Serializable]
    public partial class ProjectCulture
    {

        [MaxLength(500)]
        public string Note { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectCultureId { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }
        [InverseProperty("ProjectCulture")]
        public ICollection<Culture> Cultures { get; set; }


        public ProjectCulture()
        {
            this.Cultures = new HashSet<Culture>();

        }

    }
}

