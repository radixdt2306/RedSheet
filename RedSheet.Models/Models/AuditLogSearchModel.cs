using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.Models
{
    public class AuditLogSearchModel
    {
        public Nullable<DateTime> StartDate { get; set; }

        public Nullable<DateTime> EndDate { get; set; }

        public int? UserId { get; set; }

        public int? MainRecordId { get; set; }

        public int? ApplicationModuleId { get; set; }

        public string RequestMethod { get; set; }
    }
}
