
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectStakeholders", Schema = "dbo")]
	[Serializable]
	public partial class ProjectStakeholder  
	{
 
	[Required] 
	[MaxLength(250)]
	public string Frequancy { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectStakeholderId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string StakeholderName { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
 
	[RelationshipTableAttribue("StakeholderTypes","dbo")]
	//Relationships
	public int StakeholderTypeId { get; set; } 
 
	[ForeignKey("StakeholderTypeId")]
	public StakeholderType StakeholderType { get; set; } 
	[InverseProperty("ProjectStakeholder")]
	public ICollection<StakeholderCommunicationMode> StakeholderCommunicationModes { get; set; } 


	public ProjectStakeholder()
	{
	this.StakeholderCommunicationModes = new HashSet<StakeholderCommunicationMode>();

    }

    }
}

