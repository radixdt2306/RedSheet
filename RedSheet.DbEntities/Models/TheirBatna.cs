
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("TheirBatnas", Schema = "dbo")]
	[Serializable]
	public partial class TheirBatna  
	{
 
	[Required] 
	[MaxLength(400)]
	public string TheirBatanValue { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TheirBatnaId { get; set; } 
 
	[RelationshipTableAttribue("ProjectRequirements","dbo")]
	//Relationships
	public int ProjectRequirementId { get; set; } 
 
	[ForeignKey("ProjectRequirementId")]
	public ProjectRequirement ProjectRequirement { get; set; } 

	public TheirBatna()
	{
    }

    }
}

