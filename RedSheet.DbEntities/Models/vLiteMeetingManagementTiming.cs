
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteMeetingManagementTimings", Schema = "dbo")]
	[Serializable]
	public partial class vLiteMeetingManagementTiming  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteMeetingManagementId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LiteMeetingManagementTimingId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string NegotiationPhase { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NegotiationPhaseId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Process { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SortOrder { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TacticId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TacticName { get; set; } 
 
	[Required]
	public TimeSpan Time { get; set; } 

	public vLiteMeetingManagementTiming()
	{
    }

    }
}

