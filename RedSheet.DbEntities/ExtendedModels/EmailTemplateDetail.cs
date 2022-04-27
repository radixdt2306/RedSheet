using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.ExtendedModels
{
    public partial class EmailTemplateDetail
    {
        [NotMapped]
        public string OperationMode { get; set; }

    }
}
