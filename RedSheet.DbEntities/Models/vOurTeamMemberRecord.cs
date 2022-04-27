
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vOurTeamMemberRecords", Schema = "dbo")]
	[Serializable]
	public partial class vOurTeamMemberRecord  
	{
 
	[Range(1, int.MaxValue)]
	public int AgreeableId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int AssertivenessId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ConflictStyleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ConsciousnessId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int EmotionalCompetenceId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OpenMindedId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int OurTeamMemberId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OutingId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PersonalCalmId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SolutionFocusedId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TeamRoleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int WillToWinId { get; set; } 

	public vOurTeamMemberRecord()
	{
    }

    }
}

