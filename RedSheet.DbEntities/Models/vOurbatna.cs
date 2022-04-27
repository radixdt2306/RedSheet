
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vOurBatnas", Schema = "dbo")]
	[Serializable]
	public partial class vOurBatna  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int OurbatnaId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OurbatnaValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectRequirementId { get; set; } 

	public vOurBatna()
	{
    }

    }
}

