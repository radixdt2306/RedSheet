
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ApplicationExceptionLogs", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationExceptionLog  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationExceptionLogId { get; set; } 

	public Nullable<int> ApplicationModuleId { get; set; } 

	public Nullable<int> ApplicationTimeZoneId { get; set; } 
 
	[Required] 
	[Column(TypeName = "date")]
	public System.DateTime ExceptionDate { get; set; } 
 
	[Required]
	public string ExceptionSource { get; set; } 
 
	[Required]
	public string ExceptionType { get; set; } 
 
	[Required]
	public string InnerException { get; set; } 
 
	[Required]
	public string Message { get; set; } 
 
	[MaxLength(10)]
	public string RequestMethod { get; set; } 
 
	[Required]
	public string StackTrace { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string Url { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 

	public ApplicationExceptionLog()
	{
    }

    }
}

