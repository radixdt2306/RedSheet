
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectNegotionalityRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectNegotionalityRecord  
	{
 
	[Required]
	public bool IsMarketDifficult { get; set; } 
 
	[Required]
	public bool IsSpendLarge { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NegotionalityCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectNegotionalityId { get; set; } 

	public vProjectNegotionalityRecord()
	{
    }

    }
}

