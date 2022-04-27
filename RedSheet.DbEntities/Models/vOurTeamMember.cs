
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vOurTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class vOurTeamMember  
	{
 
	[MaxLength(1)]
	public string AgreeableBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string AgreeableRequire { get; set; } 
 
	[MaxLength(50)]
	public string AssertivenessBehaviour { get; set; } 
 
	[MaxLength(50)]
	public string AssertivenessChange { get; set; } 
 
	[MaxLength(50)]
	public string AssertivenessRequire { get; set; } 

	public Nullable<int> ChangeAgreeable { get; set; } 

	public Nullable<int> ChangeConsciousness { get; set; } 

	public Nullable<int> ChangeOpenMindedId { get; set; } 

	public Nullable<int> ChangeOuting { get; set; } 

	public Nullable<int> ChangePersonalCalm { get; set; } 

	public Nullable<int> ChangeSolutionFocused { get; set; } 

	public Nullable<int> ChangeWIllToWin { get; set; } 
 
	[MaxLength(50)]
	public string ConflictStyleBehaviour { get; set; } 
 
	[MaxLength(50)]
	public string ConflictStyleChange { get; set; } 
 
	[MaxLength(50)]
	public string ConflictStyleRequire { get; set; } 
 
	[MaxLength(1)]
	public string ConsciousnessBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string ConsciousnessRequire { get; set; } 
 
	[MaxLength(50)]
	public string EmotionalCompetenceBehaviour { get; set; } 
 
	[MaxLength(50)]
	public string EmotionalCompetenceChange { get; set; } 
 
	[MaxLength(50)]
	public string EmotionalCompetenceRequire { get; set; } 
 
	[MaxLength(1)]
	public string OpenMindedBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string OpenMindedRequire { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int OurTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string OurTeamMemberName { get; set; } 
 
	[MaxLength(1)]
	public string OutingBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string OutingRequire { get; set; } 
 
	[MaxLength(1)]
	public string PersonalCalmBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string PersonalCalmRequire { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectNegotionalityId { get; set; } 
 
	[MaxLength(1)]
	public string SolutionFocusedBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string SolutionFocusedRequire { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TeamRoleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TeamRoleName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 
 
	[MaxLength(1)]
	public string WIllToWinBehaviour { get; set; } 
 
	[MaxLength(1)]
	public string WillToWinRequire { get; set; } 

	public vOurTeamMember()
	{
    }

    }
}

