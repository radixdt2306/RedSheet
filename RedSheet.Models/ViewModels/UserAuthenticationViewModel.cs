using Newtonsoft.Json;
using Rx.Core.Internationalization;
using System;
using System.Collections.Generic;

namespace RedSheet.ViewModels.Models
{
    public class UserAuthenticationViewModel
    {
        public string AcademyUrl { get; set; }

		public int UserId { get; set; }
        public string Token { get; set; }

        public string FullName { get; set; }
        public string UserName { get; set; }

        public int RoleId { get; set; }
        public string UserTypeId { get; set; }
        public Dictionary<string,object> Modules { get; set; }
        public int FailedCount { get; set; }

        public bool FailedLogin { get; set; }

        public string ValidationMessage { get; set; }

        [JsonConverter(typeof(ZoneDateTimeConverter))]
        public DateTime DateData { get; set; }

        

    }
}
