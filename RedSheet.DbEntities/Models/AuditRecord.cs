
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("AuditRecords", Schema = "dbo")]
	[Serializable]
	public partial class AuditRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int AuditRecordId { get; set; } 
 
	[Required] 
	[MaxLength(9)]
	public string EventType { get; set; } 
 
	[Required]
	public string NewValue { get; set; } 

	public string OldValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RecordId { get; set; } 
 
	[Required]
	public string RecordName { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string TableName { get; set; } 
 
	[RelationshipTableAttribue("AuditRequests","dbo")]
	//Relationships
	public Nullable<int> AuditRequestId { get; set; } 
 
	[ForeignKey("AuditRequestId")]
	public AuditRequest AuditRequest { get; set; } 
	[InverseProperty("AuditRecord")]
	public ICollection<AuditRecordDetail> AuditRecordDetails { get; set; } 


	public AuditRecord()
	{
	this.AuditRecordDetails = new HashSet<AuditRecordDetail>();

    }

    }
}

