
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vAuditRecords", Schema = "dbo")]
	[Serializable]
	public partial class vAuditRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int AuditRecordId { get; set; } 

	public Nullable<int> AuditRequestId { get; set; } 
 
	[Required] 
	[MaxLength(9)]
	public string EventType { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RecordId { get; set; } 
 
	[Required]
	public string RecordName { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string TableName { get; set; } 

	public vAuditRecord()
	{
    }

    }
}

