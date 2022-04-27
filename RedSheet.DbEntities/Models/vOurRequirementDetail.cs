
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vOurRequirementDetails", Schema = "dbo")]
	[Serializable]
	public partial class vOurRequirementDetail  
	{
 
	[Required] 
	[MaxLength(100)]
	public string ApplicationObjectName { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string FourStep { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ldo { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string mdo { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int OurRequirementDetailId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectRequirementId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Requirement { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string SecondStep { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ThirdStep { get; set; } 

	public vOurRequirementDetail()
	{
    }

    }
}

