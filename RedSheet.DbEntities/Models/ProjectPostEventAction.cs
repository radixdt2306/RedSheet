
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectPostEventActions", Schema = "dbo")]
    [Serializable]
    public partial class ProjectPostEventAction
    {

        [Required]
        [MaxLength(50)]
        public string PostEventActionBy { get; set; }

        [Required]
        [MaxLength(100)]
        public string PostEventActionDetail { get; set; }

        [Required]
        public System.DateTime PostEventActionOn { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectPostEventActionId { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }

        public ProjectPostEventAction()
        {
        }

    }
}

