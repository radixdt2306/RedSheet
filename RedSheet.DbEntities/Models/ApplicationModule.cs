
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ApplicationModules", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationModule  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationModuleId { get; set; } 

	public Nullable<int> ParentApplicationModuleId { get; set; } 
 
	[Required] 
	[MaxLength(1)]
	public string VisibleActionItem { get; set; } 
 
	[RelationshipTableAttribue("ModuleMasters","dbo")]
	//Relationships
	public int ModuleMasterId { get; set; } 
 
	[ForeignKey("ModuleMasterId")]
	public ModuleMaster ModuleMaster { get; set; } 
	[InverseProperty("ApplicationModule")]
	public ICollection<EmailTemplateDetail> EmailTemplateDetails { get; set; } 

	[InverseProperty("ApplicationModule")]
	public ICollection<RolePermission> RolePermissions { get; set; } 

	[InverseProperty("ApplicationModule")]
	public ICollection<ModuleContent> ModuleContents { get; set; } 


	public ApplicationModule()
	{
	this.EmailTemplateDetails = new HashSet<EmailTemplateDetail>();

	this.RolePermissions = new HashSet<RolePermission>();

	this.ModuleContents = new HashSet<ModuleContent>();

    }

    }
}

