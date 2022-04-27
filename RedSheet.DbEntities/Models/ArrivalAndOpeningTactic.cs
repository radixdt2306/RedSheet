
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ArrivalAndOpeningTactics", Schema = "dbo")]
	[Serializable]
	public partial class ArrivalAndOpeningTactic  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ArrivalAndOpeningTacticId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ArrivalAndOpeningTacticValue { get; set; } 
 
	[RelationshipTableAttribue("ProjectEventTimelines","dbo")]
	//Relationships
	public int ProjectEventTimelineId { get; set; } 
 
	[ForeignKey("ProjectEventTimelineId")]
	public ProjectEventTimeline ProjectEventTimeline { get; set; } 

	public ArrivalAndOpeningTactic()
	{
    }

    }
}

