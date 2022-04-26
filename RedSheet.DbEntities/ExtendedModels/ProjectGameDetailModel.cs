using RedSheet.DbEntities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.ExtendedModels
{
    public partial class ProjectGameDetailModel
    {
        [NotMapped]
        public bool isMonochronic { get; set; }

        [NotMapped]
        public ProjectGameDetail projectGameDetail { get; set; }

    }
}
