using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class ExceptionLogViewModel
    {
        [Key]
        public int ApplicationExceptionLogId { get; set; }

        public string Message { get; set; }
        public string FullName { get; set; }
        public string ModuleMasterName { get; set; }
    }
}
