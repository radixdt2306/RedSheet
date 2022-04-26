
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("OurTeamMemberBehaviours", Schema = "dbo")]
	[Serializable]
	public partial class OurTeamMemberBehaviour  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int OurTeamMemberBehaviourId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour AgreeableId { get; set; } 
	///<summary>
    ///{{AssertivenessBehaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public AssertivenessBehaviour AssertivenessId { get; set; } 
	///<summary>
    ///{{ConflictStyleBehviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public ConflictStyleBehviour ConflictStyleId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour ConsciousnessId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour EmotionalCompetenceId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour OpenMindedId { get; set; } 
 
	[RelationshipTableAttribue("OurTeamMembers","dbo")]
	//Relationships
	public int OurTeamMemberId { get; set; } 
 
	[ForeignKey("OurTeamMemberId")]
	public OurTeamMember OurTeamMember { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour OutingId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour PersonalCalmId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour SolutionFocusedId { get; set; } 
	///<summary>
    ///{{Behaviour}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Behaviour WIllToWinId { get; set; } 

	public OurTeamMemberBehaviour()
	{
    }

    }
}

