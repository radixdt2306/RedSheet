
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoDiscussionSequenceRecords", Schema = "dbo")]
	[Serializable]
	public partial class vNanoDiscussionSequenceRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoDiscussionSequenceId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NegotiationPhaseId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Process { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SortOrder { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TacticId { get; set; } 
 
	[Required]
	public TimeSpan Time { get; set; } 

	public vNanoDiscussionSequenceRecord()
	{
    }

    }
}

