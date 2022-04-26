
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoRelationshipRequires", Schema = "dbo")]
	[Serializable]
	public partial class vNanoRelationshipRequire  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoRelationshipRequireId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string NanoRelationshipRequireName { get; set; } 

	public vNanoRelationshipRequire()
	{
    }

    }
}

