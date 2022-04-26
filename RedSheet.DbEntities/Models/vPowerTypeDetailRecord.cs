
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vPowerTypeDetailRecords", Schema = "dbo")]
	[Serializable]
	public partial class vPowerTypeDetailRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int ActualId { get; set; } 
 
	[Required]
	public bool IsOurKnowledge { get; set; } 
 
	[Required]
	public bool IsTheirKnowledge { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int PowerTypeDetailId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PowerTypeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string PowerTypeName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectedId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectPowerId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Rationale { get; set; } 

	public vPowerTypeDetailRecord()
	{
    }

    }
}

