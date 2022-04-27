
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectPowerRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectPowerRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string PowerDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectPowerId { get; set; } 

	public vProjectPowerRecord()
	{
    }

    }
}

