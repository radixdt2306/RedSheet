
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vStakeholderCommunicationModes", Schema = "dbo")]
	[Serializable]
	public partial class vStakeholderCommunicationMode  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CommunicationModeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string CommunicationModeName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectStakeholderId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int StakeholderCommunicationModeId { get; set; } 

	public vStakeholderCommunicationMode()
	{
    }

    }
}

