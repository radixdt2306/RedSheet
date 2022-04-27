
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteTheirTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class vLiteTheirTeamMember  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteProjectBackgroundId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LiteTheirTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string LiteTheirTeamMemberName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PersonalityId { get; set; } 
 
	[MaxLength(10)]
	public string PersonalityKeyText { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string Position { get; set; } 

	public vLiteTheirTeamMember()
	{
    }

    }
}

