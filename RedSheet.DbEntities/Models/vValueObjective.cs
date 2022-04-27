
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vValueObjectives", Schema = "dbo")]
	[Serializable]
	public partial class vValueObjective  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ValueObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ValueObjectiveName { get; set; } 

	public vValueObjective()
	{
    }

    }
}

