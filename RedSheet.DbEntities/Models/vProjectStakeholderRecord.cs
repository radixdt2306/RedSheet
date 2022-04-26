
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectStakeholderRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectStakeholderRecord  
	{
 
	[Required] 
	[MaxLength(250)]
	public string Frequancy { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectStakeholderId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string StakeholderName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int StakeholderTypeId { get; set; } 

	public vProjectStakeholderRecord()
	{
    }

    }
}

