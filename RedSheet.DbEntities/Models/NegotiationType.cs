
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("NegotiationTypes", Schema = "dbo")]
	[Serializable]
	public partial class NegotiationType  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NegotiationTypeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string NegotiationTypeName { get; set; } 
	[InverseProperty("NegotiationType")]
	public ICollection<ProjectBackground> ProjectBackgrounds { get; set; } 


	public NegotiationType()
	{
	this.ProjectBackgrounds = new HashSet<ProjectBackground>();

    }

    }
}

