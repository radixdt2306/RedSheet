
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("MeetingRequirements", Schema = "dbo")]
	[Serializable]
	public partial class MeetingRequirement  
	{
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int MeetingRequirementId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string MeetingRequirementValue { get; set; } 

	public MeetingRequirement()
	{
    }

    }
}

