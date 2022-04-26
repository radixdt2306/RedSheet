
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTheirTeamCommunicationModeRecords", Schema = "dbo")]
	[Serializable]
	public partial class vTheirTeamCommunicationModeRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CommunicationModeId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectNegotiationId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirTeamCommunicationModeId { get; set; } 

	public vTheirTeamCommunicationModeRecord()
	{
    }

    }
}

