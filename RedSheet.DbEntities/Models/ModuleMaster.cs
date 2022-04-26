
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ModuleMasters", Schema = "dbo")]
	[Serializable]
	public partial class ModuleMaster  
	{
 
	[Required]
	public bool Active { get; set; } 

	public Nullable<bool> IsRolePermissionItem { get; set; } 
 
	[Required]
	public bool IsRoot { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ModuleMasterId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 
	[InverseProperty("ModuleMaster")]
	public ICollection<ApplicationModule> ApplicationModules { get; set; } 


	public ModuleMaster()
	{
	this.ApplicationModules = new HashSet<ApplicationModule>();

    }

    }
}

