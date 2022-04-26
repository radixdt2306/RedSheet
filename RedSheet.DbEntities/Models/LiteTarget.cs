
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LiteTargets", Schema = "dbo")]
	[Serializable]
	public partial class LiteTarget  
	{
 
	[Required] 
	[MaxLength(50)]
	public string LiteTargetDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteTargetId { get; set; } 
 
	[RelationshipTableAttribue("LiteProjectBackgrounds","dbo")]
	//Relationships
	public int LiteProjectBackgroundId { get; set; } 
 
	[ForeignKey("LiteProjectBackgroundId")]
	public LiteProjectBackground LiteProjectBackground { get; set; } 

	public LiteTarget()
	{
    }

    }
}

