
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteRelationshipRequires", Schema = "dbo")]
	[Serializable]
	public partial class vLiteRelationshipRequire  
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

	public vLiteRelationshipRequire()
	{
    }

    }
}

