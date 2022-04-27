
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ScheduleEmails", Schema = "dbo")]
	[Serializable]
	public partial class ScheduleEmail  
	{
 
	[Required] 
	[MaxLength(200)]
	public string EmailFrom { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string EmailTemplateName { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string EmailTo { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int InactivityDays { get; set; }

    [Range(1, int.MaxValue)]
    public int ProjectModuleId { get; set; }

    [Required]
	public bool IsSentScheduleEmail { get; set; } 
 
	[MaxLength(1000)]
	public string ModuleName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ProjectName { get; set; } 
 
	[Required]
	public System.DateTime RequestedDateTime { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ScheduleEmailId { get; set; } 

	public ScheduleEmail()
	{
    }

    }
}

