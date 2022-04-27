using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Models
{
    public partial class OurRequirementDetail
    {
        [NotMapped]
        public int ProjectModuleId { get; set; }

    }
}
