using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Rx.Core.Internationalization;
using System;

namespace RedSheet.ViewModels.Models
{
    
    public class UserCredentialViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public DateTime DateData { get; set; }


        public int FailedCount { get; set; }

		public int UserId { get; set; }
    }
}
