
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vOurTheirRequirenmentDetails", Schema = "dbo")]
	[Serializable]
	public partial class vOurTheirRequirenmentDetail  
	{
 
	[Required]
	public bool IsZoma { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OurLDO { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OurMDO { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int OurRequirementDetailId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OurRequirenment { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectRequirementId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequirementCategoryId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string TheirLDO { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string TheirMDO { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirRequirementDetailId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string TheirRequirenment { get; set; } 

	public vOurTheirRequirenmentDetail()
	{
    }

    }
}

