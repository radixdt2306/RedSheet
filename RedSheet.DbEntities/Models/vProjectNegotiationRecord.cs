
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectNegotiationRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectNegotiationRecord  
	{
 
	[Required]
	public System.DateTime EventDate { get; set; } 
 
	[Required] 
	[MaxLength(400)]
	public string IntangiblePowerPlan { get; set; } 
 
	[MaxLength(500)]
	public string KnowAboutThem { get; set; } 
 
	[MaxLength(750)]
	public string KnownIssues { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string Location { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectNegotiationId { get; set; } 

	public vProjectNegotiationRecord()
	{
    }

    }
}

