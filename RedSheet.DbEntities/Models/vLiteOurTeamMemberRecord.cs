
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteOurTeamMemberRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteOurTeamMemberRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteOurTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LiteOurTeamMemberName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LiteProjectBackgroundId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PersonalityId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string Position { get; set; } 

	public vLiteOurTeamMemberRecord()
	{
    }

    }
}

