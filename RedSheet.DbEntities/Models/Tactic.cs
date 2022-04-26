
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Tactics", Schema = "dbo")]
	[Serializable]
	public partial class Tactic  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int TacticId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TacticName { get; set; } 
	[InverseProperty("Tactic")]
	public ICollection<LiteMeetingManagementTiming> LiteMeetingManagementTimings { get; set; } 

	[InverseProperty("Tactic")]
	public ICollection<EventAgendaTiming> EventAgendaTimings { get; set; } 

	[InverseProperty("Tactic")]
	public ICollection<NanoDiscussionSequence> NanoDiscussionSequences { get; set; } 


	public Tactic()
	{
	this.LiteMeetingManagementTimings = new HashSet<LiteMeetingManagementTiming>();

	this.EventAgendaTimings = new HashSet<EventAgendaTiming>();

	this.NanoDiscussionSequences = new HashSet<NanoDiscussionSequence>();

    }

    }
}

