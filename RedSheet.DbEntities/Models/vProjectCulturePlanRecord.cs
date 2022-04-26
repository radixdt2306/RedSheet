
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectCulturePlanRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectCulturePlanRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int CulturePlanCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectCulturePlanId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ProjectCulturePlanValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public vProjectCulturePlanRecord()
	{
    }

    }
}

