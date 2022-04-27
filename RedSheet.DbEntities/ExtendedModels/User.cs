using Newtonsoft.Json;
using Rx.Core.Internationalization;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RedSheet.DbEntities.Models
{
    public partial class User
    {
        [NotMapped]
        public string UserPassword { get; set; }

        [NotMapped]
        public bool IsChangePassword { get; set; }


        [NotMapped]
        public string ConfirmPassword { get; set; }

        [NotMapped]
        public DateTime DateData { get; set; }

    }
}
