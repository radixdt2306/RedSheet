
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Targets", Schema = "dbo")]
	[Serializable]
	public partial class Target  
	{
 
	[Required] 
	[MaxLength(200)]
	public string TargetDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TargetId { get; set; } 
 
	[RelationshipTableAttribue("ProjectNegotiations","dbo")]
	//Relationships
	public int ProjectNegotiationId { get; set; } 
 
	[ForeignKey("ProjectNegotiationId")]
	public ProjectNegotiation ProjectNegotiation { get; set; } 

	public Target()
	{
    }

    }
}

