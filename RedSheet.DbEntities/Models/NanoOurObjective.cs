
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("NanoOurObjectives", Schema = "dbo")]
	[Serializable]
	public partial class NanoOurObjective  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoOurObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string NanoOurObjectiveValue { get; set; } 
 
	[RelationshipTableAttribue("NanoScopeToNegotiateObjectives","dbo")]
	//Relationships
	public int NanoScopeToNegotiateObjectiveId { get; set; } 
 
	[ForeignKey("NanoScopeToNegotiateObjectiveId")]
	public NanoScopeToNegotiateObjective NanoScopeToNegotiateObjective { get; set; } 

	public NanoOurObjective()
	{
    }

    }
}

