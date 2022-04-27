
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LongTermObjectives", Schema = "dbo")]
	[Serializable]
	public partial class LongTermObjective  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LongTermObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LongTermObjectiveValue { get; set; } 
 
	[RelationshipTableAttribue("ProjectBackgrounds","dbo")]
	//Relationships
	public int ProjectBackgroundId { get; set; } 
 
	[ForeignKey("ProjectBackgroundId")]
	public ProjectBackground ProjectBackground { get; set; } 

	public LongTermObjective()
	{
    }

    }
}

