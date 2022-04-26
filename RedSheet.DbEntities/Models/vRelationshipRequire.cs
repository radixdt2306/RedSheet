
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vRelationshipRequires", Schema = "dbo")]
	[Serializable]
	public partial class vRelationshipRequire  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RelationshipRequireId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string RelationshipRequireName { get; set; } 

	public vRelationshipRequire()
	{
    }

    }
}

