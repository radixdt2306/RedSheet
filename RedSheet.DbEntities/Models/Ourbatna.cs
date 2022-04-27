
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Ourbatnas", Schema = "dbo")]
	[Serializable]
	public partial class Ourbatna  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int OurbatnaId { get; set; } 
 
	[Required] 
	[MaxLength(400)]
	public string OurbatnaValue { get; set; } 
 
	[RelationshipTableAttribue("ProjectRequirements","dbo")]
	//Relationships
	public int ProjectRequirementId { get; set; } 
 
	[ForeignKey("ProjectRequirementId")]
	public ProjectRequirement ProjectRequirement { get; set; } 

	public Ourbatna()
	{
    }

    }
}

