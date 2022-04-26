
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vGeneratorContextModules", Schema = "dbo")]
	[Serializable]
	public partial class vGeneratorContextModule  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationModuleId { get; set; } 
 
	[Required]
	public bool IsRoot { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ModuleMasterId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 

	public Nullable<int> ParentApplicationModuleId { get; set; } 

	public vGeneratorContextModule()
	{
    }

    }
}

