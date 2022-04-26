
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectOutcomeAndLearningRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectOutcomeAndLearningRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int OutcomeAndLearningCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectOutcomeAndLearningId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ProjectOutcomeAndLearningValue { get; set; } 

	public vProjectOutcomeAndLearningRecord()
	{
    }

    }
}

