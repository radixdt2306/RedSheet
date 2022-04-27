
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTheirRequirementDetails", Schema = "dbo")]
	[Serializable]
	public partial class vTheirRequirementDetail  
	{
 
	[Required]
	public bool IsZoma { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ldo { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string mdo { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectRequirementId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Requirement { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SortOrder { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirRequirementDetailId { get; set; } 

	public vTheirRequirementDetail()
	{
    }

    }
}

