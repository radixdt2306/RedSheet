
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Games", Schema = "dbo")]
	[Serializable]
	public partial class Game  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int GameId { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string Play { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string Trigger { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public GameType GameTypeId { get; set; } 
 
	[RelationshipTableAttribue("ProjectGameDetails","dbo")]
	//Relationships
	public int ProjectGameDetailId { get; set; } 
 
	[ForeignKey("ProjectGameDetailId")]
	public ProjectGameDetail ProjectGameDetail { get; set; } 

	public Game()
	{
    }

    }
}

