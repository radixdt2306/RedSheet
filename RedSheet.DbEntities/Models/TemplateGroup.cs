
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("TemplateGroups", Schema = "dbo")]
	[Serializable]
	public partial class TemplateGroup  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key] 
	[Required]
	public Guid TemplateGroupId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string TemplateGroupName { get; set; } 
	[InverseProperty("TemplateGroup")]
	public ICollection<Project> Projects { get; set; } 


	public TemplateGroup()
	{
	this.Projects = new HashSet<Project>();

    }

    }
}

