
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNegotiationTypes", Schema = "dbo")]
	[Serializable]
	public partial class vNegotiationType  
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

	public vNegotiationType()
	{
    }

    }
}

