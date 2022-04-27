using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class AuditLogDetailViewModel
    {
        [Key]
        public int AuditRecordDetailId { get; set; }
        public string ColumnName { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

    }
}
