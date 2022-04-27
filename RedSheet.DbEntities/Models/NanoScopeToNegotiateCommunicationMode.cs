
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("NanoScopeToNegotiateCommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class NanoScopeToNegotiateCommunicationMode  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoScopeToNegotiateCommunicationModeId { get; set; } 
 
	[RelationshipTableAttribue("CommunicationModes","dbo")]
	//Relationships
	public int CommunicationModeId { get; set; } 
 
	[ForeignKey("CommunicationModeId")]
	public CommunicationMode CommunicationMode { get; set; } 
 
	[RelationshipTableAttribue("NanoScopeToNegotiateObjectives","dbo")]
	//Relationships
	public int NanoScopeToNegotiateObjectiveId { get; set; } 
 
	[ForeignKey("NanoScopeToNegotiateObjectiveId")]
	public NanoScopeToNegotiateObjective NanoScopeToNegotiateObjective { get; set; } 

	public NanoScopeToNegotiateCommunicationMode()
	{
    }

    }
}

