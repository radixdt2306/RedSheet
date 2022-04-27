
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LiteBackgroundCommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class LiteBackgroundCommunicationMode  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteBackgroundCommunicationModeId { get; set; } 
 
	[RelationshipTableAttribue("CommunicationModes","dbo")]
	//Relationships
	public int CommunicationModeId { get; set; } 
 
	[ForeignKey("CommunicationModeId")]
	public CommunicationMode CommunicationMode { get; set; } 
 
	[RelationshipTableAttribue("LiteProjectBackgrounds","dbo")]
	//Relationships
	public int LiteProjectBackgroundId { get; set; } 
 
	[ForeignKey("LiteProjectBackgroundId")]
	public LiteProjectBackground LiteProjectBackground { get; set; } 

	public LiteBackgroundCommunicationMode()
	{
    }

    }
}

