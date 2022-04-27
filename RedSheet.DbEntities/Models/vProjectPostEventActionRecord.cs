
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectPostEventActionRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectPostEventActionRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string PostEventActionBy { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string PostEventActionDetail { get; set; } 
 
	[Required]
	public System.DateTime PostEventActionOn { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectPostEventActionId { get; set; } 

	public vProjectPostEventActionRecord()
	{
    }

    }
}

