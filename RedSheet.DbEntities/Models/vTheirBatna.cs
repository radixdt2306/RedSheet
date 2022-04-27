
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTheirBatnas", Schema = "dbo")]
	[Serializable]
	public partial class vTheirBatna  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectRequirementId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string TheirBatanValue { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int TheirBatnaId { get; set; } 

	public vTheirBatna()
	{
    }

    }
}

