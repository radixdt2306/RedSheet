
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTheirTeamMemberRecords", Schema = "dbo")]
	[Serializable]
	public partial class vTheirTeamMemberRecord  
	{
 
	[MaxLength(1000)]
	public string Description { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string PersonalityColor { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int PersonalityId { get; set; } 
 
	[MaxLength(50)]
	public string PersonalityKey { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string Position { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectNegotiationId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TheirTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string TheirTeamMemberName { get; set; } 

	public vTheirTeamMemberRecord()
	{
    }

    }
}

