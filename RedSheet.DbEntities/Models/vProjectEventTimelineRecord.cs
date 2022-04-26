
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectEventTimelineRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectEventTimelineRecord  
	{
 
	[Required]
	public TimeSpan EndTime { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string EventDuration { get; set; } 
 
	[Required]
	public bool IsEndTimeFixed { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OpeningStatement { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectEventTimelineId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string RoomLayout { get; set; } 
 
	[Required]
	public TimeSpan StartTime { get; set; } 

	public vProjectEventTimelineRecord()
	{
    }

    }
}

