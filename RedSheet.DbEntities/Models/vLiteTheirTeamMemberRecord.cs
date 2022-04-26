
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteTheirTeamMemberRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteTheirTeamMemberRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteProjectBackgroundId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int LiteTheirTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string LiteTheirTeamMemberName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PersonalityId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string Position { get; set; } 

	public vLiteTheirTeamMemberRecord()
	{
    }

    }
}

