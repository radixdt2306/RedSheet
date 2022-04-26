
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteOurTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class vLiteOurTeamMember  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteOurTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LiteOurTeamMemberName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LiteProjectBackgroundId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PersonalityId { get; set; } 
 
	[MaxLength(10)]
	public string PersonalityKeyText { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string Position { get; set; } 

	public vLiteOurTeamMember()
	{
    }

    }
}

