
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNegotionalityMembers", Schema = "dbo")]
	[Serializable]
	public partial class vNegotionalityMember  
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
	public int OurTeamMemberBehaviourId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OurTeamMemberId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OurTeamMemberRequireId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OutingId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectNegotionalityId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireAgreeableId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireAssertivenessId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireConflictStyleId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireConsciousnessId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireEmotionalCompetenceId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireOpenMindedId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RequireOutingId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TeamRoleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TeamRoleName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string UserName { get; set; } 

	public vNegotionalityMember()
	{
    }

    }
}

