
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vModulewiseContents", Schema = "dbo")]
	[Serializable]
	public partial class vModulewiseContent  
	{
 
	[Required] 
	[MaxLength(10)]
	public string Action { get; set; } 

	public string Afar { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationModuleId { get; set; } 

	public string English { get; set; } 

	public string French { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LanguageContentId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LanguageContentName { get; set; } 
 
	[MaxLength(20)]
	public string LanguageContentType { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ModuleContentId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ModuleMasterId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 

	public vModulewiseContent()
	{
    }

    }
}

