
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("CommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class CommunicationMode  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CommunicationModeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string CommunicationModeName { get; set; } 
	[InverseProperty("CommunicationMode")]
	public ICollection<StakeholderCommunicationMode> StakeholderCommunicationModes { get; set; } 

	[InverseProperty("CommunicationMode")]
	public ICollection<NanoScopeToNegotiateCommunicationMode> NanoScopeToNegotiateCommunicationModes { get; set; } 

	[InverseProperty("CommunicationMode")]
	public ICollection<TheirTeamCommunicationMode> TheirTeamCommunicationModes { get; set; } 

	[InverseProperty("CommunicationMode")]
	public ICollection<LiteBackgroundCommunicationMode> LiteBackgroundCommunicationModes { get; set; } 


	public CommunicationMode()
	{
	this.StakeholderCommunicationModes = new HashSet<StakeholderCommunicationMode>();

	this.NanoScopeToNegotiateCommunicationModes = new HashSet<NanoScopeToNegotiateCommunicationMode>();

	this.TheirTeamCommunicationModes = new HashSet<TheirTeamCommunicationMode>();

	this.LiteBackgroundCommunicationModes = new HashSet<LiteBackgroundCommunicationMode>();

    }

    }
}

