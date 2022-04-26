
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectGameDetails", Schema = "dbo")]
	[Serializable]
	public partial class ProjectGameDetail  
	{
 
	[Required] 
	[MaxLength(500)]
	public string Notes { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectGameDetailId { get; set; } 
	///<summary>
    ///{{GameType}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public GameType CurrentGameId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
	///<summary>
    ///{{GameType}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public GameType TheirCurrentGameId { get; set; } 
	///<summary>
    ///{{GameType}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public GameType TheirEventGameId { get; set; } 
	[InverseProperty("ProjectGameDetail")]
	public ICollection<Game> Games { get; set; } 


	public ProjectGameDetail()
	{
	this.Games = new HashSet<Game>();

    }

    }
}

