
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vEventPlanningActionRecords", Schema = "dbo")]
	[Serializable]
	public partial class vEventPlanningActionRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string EventPlanningActionBy { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string EventPlanningActionDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EventPlanningActionId { get; set; } 
 
	[Required]
	public System.DateTime EventPlanningActionOn { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectPreparationId { get; set; } 

	public vEventPlanningActionRecord()
	{
    }

    }
}

