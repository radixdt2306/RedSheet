
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectGameDetailRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectGameDetailRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int CurrentGameId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Notes { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectGameDetailId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirCurrentGameId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirEventGameId { get; set; } 

	public vProjectGameDetailRecord()
	{
    }

    }
}

