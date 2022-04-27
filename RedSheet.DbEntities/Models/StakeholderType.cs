
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("StakeholderTypes", Schema = "dbo")]
	[Serializable]
	public partial class StakeholderType  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ActionRequried { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int StakeholderTypeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string StakeholderTypeName { get; set; } 
	[InverseProperty("StakeholderType")]
	public ICollection<ProjectStakeholder> ProjectStakeholders { get; set; } 


	public StakeholderType()
	{
	this.ProjectStakeholders = new HashSet<ProjectStakeholder>();

    }

    }
}

