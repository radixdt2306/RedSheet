
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LiteRelationshipRequires", Schema = "dbo")]
	[Serializable]
	public partial class LiteRelationshipRequire  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteRelationshipRequireId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string LiteRelationshipRequireName { get; set; } 
	[InverseProperty("LiteRelationshipRequire")]
	public ICollection<LiteProjectBackground> LiteProjectBackgrounds { get; set; } 


	public LiteRelationshipRequire()
	{
	this.LiteProjectBackgrounds = new HashSet<LiteProjectBackground>();

    }

    }
}

