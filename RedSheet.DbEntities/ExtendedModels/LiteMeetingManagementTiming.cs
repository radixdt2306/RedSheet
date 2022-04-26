using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Models
{
    public partial class LiteMeetingManagementTiming
    {
        [NotMapped]
        public int previousLiteMeetingManagementTimingId { get; set; }

        [NotMapped]
        public int previousLiteMeetingManagementTimingSortOrder { get; set; }

        [NotMapped]
        public string previousLiteMeetingManagementTimingTime { get; set; }
    }
}

