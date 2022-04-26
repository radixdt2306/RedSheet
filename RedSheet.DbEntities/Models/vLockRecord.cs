
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLockRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLockRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationModuleId { get; set; } 
 
	[MaxLength(100)]
	public string ChildModuleName { get; set; } 
 
	[Required]
	public System.DateTime ExpiresAt { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int LockRecordId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RecordId { get; set; } 

	public vLockRecord()
	{
    }

    }
}

