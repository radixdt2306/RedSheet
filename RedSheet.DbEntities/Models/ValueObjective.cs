
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ValueObjectives", Schema = "dbo")]
	[Serializable]
	public partial class ValueObjective  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ValueObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ValueObjectiveName { get; set; } 
	[InverseProperty("ValueObjective")]
	public ICollection<ProjectBackground> ProjectBackgrounds { get; set; } 

	[InverseProperty("ValueObjective")]
	public ICollection<NanoScopeToNegotiateObjective> NanoScopeToNegotiateObjectives { get; set; } 


	public ValueObjective()
	{
	this.ProjectBackgrounds = new HashSet<ProjectBackground>();

	this.NanoScopeToNegotiateObjectives = new HashSet<NanoScopeToNegotiateObjective>();

    }

    }
}

