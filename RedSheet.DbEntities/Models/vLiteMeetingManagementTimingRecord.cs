
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteMeetingManagementTimingRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteMeetingManagementTimingRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteMeetingManagementId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int LiteMeetingManagementTimingId { get; set; } 
 
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
	public TimeSpan Time { get; set; } 

	public vLiteMeetingManagementTimingRecord()
	{
    }

    }
}

