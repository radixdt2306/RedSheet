using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class EmailTokenReplaceViewModel
    {
        [Key]
        public int LanguageContentId { get; set; }
        public string LanguageContentName { get; set; }
    }
}
