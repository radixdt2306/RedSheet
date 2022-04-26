
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vArrivalAndOpeningTacticsRecords", Schema = "dbo")]
	[Serializable]
	public partial class vArrivalAndOpeningTacticsRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ArrivalAndOpeningTacticId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ArrivalAndOpeningTacticValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectEventTimelineId { get; set; } 

	public vArrivalAndOpeningTacticsRecord()
	{
    }

    }
}

