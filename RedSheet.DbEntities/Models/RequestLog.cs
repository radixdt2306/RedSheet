
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("RequestLogs", Schema = "dbo")]
	[Serializable]
	public partial class RequestLog  
	{

	public Nullable<int> ApplicationModuleId { get; set; } 

	public string AuthorizationHeader { get; set; } 
 
	[MaxLength(200)]
	public string BrowserName { get; set; } 
 
	[MaxLength(50)]
	public string ClientIPAddress { get; set; } 

	public Nullable<int> ContentLength { get; set; } 

	public string Cookies { get; set; } 
 
	[Required]
	public string Parameters { get; set; } 

	public Nullable<int> RecordId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RequestLogId { get; set; } 
 
	[Required] 
	[MaxLength(10)]
	public string RequestMethod { get; set; } 
 
	[Required]
	public System.DateTime RequestTime { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ResponseStatusCode { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ServiceUri { get; set; } 
 
	[Required]
	public TimeSpan TotalDuration { get; set; } 

	public Nullable<int> UserId { get; set; } 

	public RequestLog()
	{
    }

    }
}

