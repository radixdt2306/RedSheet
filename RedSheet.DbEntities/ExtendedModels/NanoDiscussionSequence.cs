using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.Models
{
    public partial class NanoDiscussionSequence
    {
        [NotMapped]
        public int previousNanoDiscussionSequenceId { get; set; }

        [NotMapped]
        public int previousNanoDiscussionSequenceSortOrder { get; set; }

        [NotMapped]
        public string previousNanoDiscussionSequenceTime { get; set; }
    }
}

