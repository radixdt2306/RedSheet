
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectModuleReviewers", Schema = "dbo")]
    [Serializable]
    public partial class ProjectModuleReviewer
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectModuleReviewerId { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }

        [RelationshipTableAttribue("Users", "dbo")]
        //Relationships
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public ProjectModuleReviewer()
        {
        }

    }
}

