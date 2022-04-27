using System;
using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class UserSearchViewModel
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string LanguageName { get; set; }
        public string RoleName { get; set; }
        public string ApplicationTimeZoneName { get; set; }
        public string FacebookUrl { get; set; }
        public string LinkdinUrl { get; set; }
        public string TwitterUrl { get; set; }
    }
}
