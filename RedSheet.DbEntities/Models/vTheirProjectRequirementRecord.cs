
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTheirProjectRequirementRecords", Schema = "dbo")]
	[Serializable]
	public partial class vTheirProjectRequirementRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectRequirementId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequirementCategoryId { get; set; } 

	public vTheirProjectRequirementRecord()
	{
    }

    }
}

