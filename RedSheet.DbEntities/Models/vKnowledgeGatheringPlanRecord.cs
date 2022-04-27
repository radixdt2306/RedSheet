
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vKnowledgeGatheringPlanRecords", Schema = "dbo")]
	[Serializable]
	public partial class vKnowledgeGatheringPlanRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int KnowledgeGatheringPlanId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string KnowledgeGivenBy { get; set; } 
 
	[Required]
	public System.DateTime KnowledgeGivenOn { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string KnowledgeRequired { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectPowerId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Source { get; set; } 

	public vKnowledgeGatheringPlanRecord()
	{
    }

    }
}

