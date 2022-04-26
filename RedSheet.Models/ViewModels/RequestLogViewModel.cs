using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class RequestLogViewModel
    {
        [Key]
        public int RequestLogId { get; set; }
        public string ClientIpAddress { get; set; }
        public DateTime RequestTime { get; set; }
        public TimeSpan TotalDuration { get; set; }
        public string ModuleMasterName { get; set; }
        public string FullName { get; set; }
    }
}
