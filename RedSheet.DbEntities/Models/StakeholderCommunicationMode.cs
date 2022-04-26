
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("StakeholderCommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class StakeholderCommunicationMode  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int StakeholderCommunicationModeId { get; set; } 
 
	[RelationshipTableAttribue("CommunicationModes","dbo")]
	//Relationships
	public int CommunicationModeId { get; set; } 
 
	[ForeignKey("CommunicationModeId")]
	public CommunicationMode CommunicationMode { get; set; } 
 
	[RelationshipTableAttribue("ProjectStakeholders","dbo")]
	//Relationships
	public int ProjectStakeholderId { get; set; } 
 
	[ForeignKey("ProjectStakeholderId")]
	public ProjectStakeholder ProjectStakeholder { get; set; } 

	public StakeholderCommunicationMode()
	{
    }

    }
}

