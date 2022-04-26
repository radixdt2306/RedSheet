
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("RelationshipRequires", Schema = "dbo")]
	[Serializable]
	public partial class RelationshipRequire  
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
	[InverseProperty("RelationshipRequire")]
	public ICollection<ProjectBackground> ProjectBackgrounds { get; set; } 


	public RelationshipRequire()
	{
	this.ProjectBackgrounds = new HashSet<ProjectBackground>();

    }

    }
}

