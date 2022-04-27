
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vApplicationExceptionLogs", Schema = "dbo")]
	[Serializable]
	public partial class vApplicationExceptionLog  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationExceptionLogId { get; set; } 

	public Nullable<int> ApplicationModuleId { get; set; } 
 
	[Required] 
	[Column(TypeName = "date")]
	public System.DateTime ExceptionDate { get; set; } 
 
	[Required]
	public string ExceptionSource { get; set; } 
 
	[Required]
	public string ExceptionType { get; set; } 
 
	[MaxLength(100)]
	public string FirstName { get; set; } 
 
	[Required]
	public string InnerException { get; set; } 
 
	[Required]
	public string Message { get; set; } 

	public Nullable<int> ModuleMasterId { get; set; } 
 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 
 
	[Required]
	public string StackTrace { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string Url { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 

	public vApplicationExceptionLog()
	{
    }

    }
}

