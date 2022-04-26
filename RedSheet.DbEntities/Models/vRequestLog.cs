
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vRequestLogs", Schema = "dbo")]
	[Serializable]
	public partial class vRequestLog  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public Nullable<int> ApplicationModuleId { get; set; } 
 
	[MaxLength(200)]
	public string BrowserName { get; set; } 
 
	[MaxLength(50)]
	public string ClientIPAddress { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ModuleMasterId { get; set; } 
 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 
 
	[MaxLength(201)]
	public string Name { get; set; } 
 
	[Required]
	public string Parameters { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequestLogId { get; set; } 
 
	[Required]
	public System.DateTime RequestTime { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ServiceUri { get; set; } 
 
	[Required]
	public TimeSpan TotalDuration { get; set; } 

	public Nullable<int> UserId { get; set; } 

	public vRequestLog()
	{
    }

    }
}

