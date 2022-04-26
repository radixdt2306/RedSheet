
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("TheirTeamCommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class TheirTeamCommunicationMode  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TheirTeamCommunicationModeId { get; set; } 
 
	[RelationshipTableAttribue("CommunicationModes","dbo")]
	//Relationships
	public int CommunicationModeId { get; set; } 
 
	[ForeignKey("CommunicationModeId")]
	public CommunicationMode CommunicationMode { get; set; } 
 
	[RelationshipTableAttribue("ProjectNegotiations","dbo")]
	//Relationships
	public int ProjectNegotiationId { get; set; } 
 
	[ForeignKey("ProjectNegotiationId")]
	public ProjectNegotiation ProjectNegotiation { get; set; } 

	public TheirTeamCommunicationMode()
	{
    }

    }
}

