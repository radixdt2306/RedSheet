
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectModuleAssignees", Schema = "dbo")]
	[Serializable]
	public partial class vProjectModuleAssignee  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleAssigneeId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[MaxLength(50)]
	public string UserName { get; set; } 

	public vProjectModuleAssignee()
	{
    }

    }
}

