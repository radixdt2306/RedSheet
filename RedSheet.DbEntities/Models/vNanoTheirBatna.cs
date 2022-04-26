
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoTheirBatnas", Schema = "dbo")]
	[Serializable]
	public partial class vNanoTheirBatna  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoTheirBatnaId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string NanoTheirBatnaValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public vNanoTheirBatna()
	{
    }

    }
}

