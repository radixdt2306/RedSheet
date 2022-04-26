using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class DeleteRecordViewModel
    {
        [Key]
        public int Id { get; set; }
        public string KeyValue { get; set; }
    }
}
