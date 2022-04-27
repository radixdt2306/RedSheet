
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vEventAgendaTimingRecords", Schema = "dbo")]
	[Serializable]
	public partial class vEventAgendaTimingRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EventAgendaTimingId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NegotiationPhaseId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string PayOff { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Process { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectEventTimelineId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Purpose { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SortOrder { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TacticsId { get; set; } 
 
	[Required]
	public TimeSpan Time { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Topic { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Trigger { get; set; } 

	public vEventAgendaTimingRecord()
	{
    }

    }
}

