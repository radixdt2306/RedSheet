using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RedSheet.Models.Models
{
    public class EmailTransactionNewMessage
    {
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public int EmailTransactionId { get; set; }
		public int ProjectId { get; set; }
		public int ProjectModuleId { get; set; }
		public IEnumerable<string> EmailTo { get; set; }
		public string EmailFrom { get; set; }
		public string EmailSubject { get; set; }
		public string EmailMessage { get; set; }
		public string EmailStatus { get; set; }
		public bool IsSystemGenerated { get; set; }
		public int UserId { get; set; }
		public string UpdatedOn { get; set; }
		public int UpdatedBy { get; set; }
		public bool IsSend { get; set; }

	}
}
