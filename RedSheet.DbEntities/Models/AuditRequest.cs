
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("AuditRequests", Schema = "dbo")]
	[Serializable]
	public partial class AuditRequest  
	{
 
	[Range(1, int.MaxValue)]
	public int ApplicationModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ApplicationTimeZoneId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int AuditRequestId { get; set; } 
 
	[Required]
	public System.DateTime CreatedDate { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int MainRecordId { get; set; } 
 
	[Required] 
	[MaxLength(20)]
	public string RequestMethod { get; set; } 
 
	[Required]
	public string Uri { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 
	[InverseProperty("AuditRequest")]
	public ICollection<AuditRecord> AuditRecords { get; set; } 


	public AuditRequest()
	{
	this.AuditRecords = new HashSet<AuditRecord>();

    }

    }
}

