
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectBackgrounds", Schema = "dbo")]
	[Serializable]
	public partial class ProjectBackground  
	{
 
	[Required] 
	[MaxLength(250)]
	public string Focus { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string OpponentName { get; set; } 
	///<summary>
    ///{{Status}}
    ///</summary> 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectBackgroundId { get; set; } 
 
	[Required] 
	[MaxLength(250)]
	public string Reason { get; set; } 
 
	[RelationshipTableAttribue("NegotiationTypes","dbo")]
	//Relationships
	public int NegotiationTypeId { get; set; } 
 
	[ForeignKey("NegotiationTypeId")]
	public NegotiationType NegotiationType { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
 
	[RelationshipTableAttribue("RelationshipRequires","dbo")]
	//Relationships
	public int RelationshipRequireId { get; set; } 
 
	[ForeignKey("RelationshipRequireId")]
	public RelationshipRequire RelationshipRequire { get; set; } 
 
	[RelationshipTableAttribue("ValueObjectives","dbo")]
	//Relationships
	public int ValueObjectiveId { get; set; } 
 
	[ForeignKey("ValueObjectiveId")]
	public ValueObjective ValueObjective { get; set; } 
	[InverseProperty("ProjectBackground")]
	public ICollection<LongTermObjective> LongTermObjectives { get; set; } 

	[InverseProperty("ProjectBackground")]
	public ICollection<BackgroundEvent> BackgroundEvents { get; set; } 


	public ProjectBackground()
	{
	this.LongTermObjectives = new HashSet<LongTermObjective>();

	this.BackgroundEvents = new HashSet<BackgroundEvent>();

    }

    }
}

