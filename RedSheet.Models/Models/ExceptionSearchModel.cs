using System;
using System.Data.SqlTypes;

namespace RedSheet.ViewModels.Models
{
    public class LogSearchModel
    {
        public Nullable<int> UserId { get; set; } = 0;
        public Nullable<int> ApplicationModuleId { get; set; } = 0;

        public Nullable<DateTime> StartDate { get; set; }

        public Nullable<DateTime> EndDate { get; set; }

    }

    
}
