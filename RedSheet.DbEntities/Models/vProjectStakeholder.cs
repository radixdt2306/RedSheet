
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectStakeholders", Schema = "dbo")]
	[Serializable]
	public partial class vProjectStakeholder  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ActionRequried { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 

	public string CommunicationModeName { get; set; } 
 
	[Required] 
	[MaxLength(250)]
	public string Frequancy { get; set; } 

	public string IconClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectStakeholderId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string StakeholderName { get; set; } 

	public vProjectStakeholder()
	{
    }

    }
}

