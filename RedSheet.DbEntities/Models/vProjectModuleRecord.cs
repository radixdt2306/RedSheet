
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectModuleRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectModuleRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int CreatedBy { get; set; } 
 
	[Required]
	public System.DateTime CreatedOn { get; set; } 
 
	[Required]
	public string HtmlHelp { get; set; } 
 
	[Required]
	public bool IsClosed { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ModuleOrder { get; set; } 
 
	[MaxLength(1000)]
	public string Note { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OwnerId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string OwnerName { get; set; } 

	public string OwnerNote { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ProjectName { get; set; } 
 
	[MaxLength(1000)]
	public string ProjectNote { get; set; } 
 
	[Required]
	public bool Status { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TemplateModuleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TemplateModuleName { get; set; } 

	public vProjectModuleRecord()
	{
    }

    }
}

