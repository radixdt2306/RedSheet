
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectOutcomeAndLearnings", Schema = "dbo")]
	[Serializable]
	public partial class ProjectOutcomeAndLearning  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectOutcomeAndLearningId { get; set; } 
 
	[Required] 
	[MaxLength(400)]
	public string ProjectOutcomeAndLearningValue { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public OutcomeAndLearningCategory OutcomeAndLearningCategoryId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 

	public ProjectOutcomeAndLearning()
	{
    }

    }
}

