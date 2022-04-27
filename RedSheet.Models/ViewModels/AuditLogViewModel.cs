using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class AuditLogViewModel
    {
        [Key]
        public int AuditRequestId { get; set; }


        public string UserName { get; set; }

        public DateTime Date { get; set; }

        public string EventType { get; set; }
    }
}
