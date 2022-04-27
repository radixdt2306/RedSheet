
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("AuditRecordDetails", Schema = "dbo")]
	[Serializable]
	public partial class AuditRecordDetail  
	{
	///<summary>
    ///Record Details
    ///</summary> 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int AuditRecordDetailId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string ColumnName { get; set; } 

	public string NewValue { get; set; } 

	public string OldValue { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string ReferenceTableName { get; set; } 
 
	[RelationshipTableAttribue("AuditRecords","dbo")]
	//Relationships
	public int AuditRecordId { get; set; } 
 
	[ForeignKey("AuditRecordId")]
	public AuditRecord AuditRecord { get; set; } 

	public AuditRecordDetail()
	{
    }

    }
}

