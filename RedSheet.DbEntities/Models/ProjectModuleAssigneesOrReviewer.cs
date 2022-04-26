using Rx.Core.Data.Attributes;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Models
{
    [Table("ProjectModuleAssigneesOrReviewers", Schema = "dbo")]
    [Serializable]
    public partial class ProjectModuleAssigneesOrReviewer
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProjectModuleAssigneesOrReviewerId { get; set; }

        [RelationshipTableAttribue("Projects", "dbo")]
        //Relationships
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; }

        [RelationshipTableAttribue("Users", "dbo")]
        //Relationships
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public bool IsAssignee { get; set; }

        public bool IsReviewer { get; set; }

        public ProjectModuleAssigneesOrReviewer()
        {
        }
    }
}
