
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTemplateModules", Schema = "dbo")]
	[Serializable]
	public partial class vTemplateModule  
	{

	public string AssigneeName { get; set; } 

	public string OwnerNote { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public string ReviewerName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TemplateModuleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TemplateModuleName { get; set; } 

	public Nullable<int> UserId { get; set; } 

	public vTemplateModule()
	{
    }

    }
}

