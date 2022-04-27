
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Users", Schema = "dbo")]
	[Serializable]
	public partial class User  
	{
 
	[MaxLength(100)]
	public string Address { get; set; } 

	public Nullable<int> ApplicationTimeZoneId { get; set; } 
 
	[MaxLength(50)]
	public string City { get; set; } 
 
	[Required]
	public Guid CompanyId { get; set; } 
 
	[MaxLength(100)]
	public string CompanyName { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string Email { get; set; } 
 
	[MaxLength(100)]
	public string FacebookUrl { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string FirstName { get; set; } 
 
	[Required] 
	[MaxLength(6)]
	public string Initial { get; set; } 

	public Nullable<bool> IsFirstTimeLogin { get; set; } 

	public Nullable<int> LanguageId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LastName { get; set; } 
 
	[MaxLength(100)]
	public string LinkdinUrl { get; set; } 
 
	[MaxLength(20)]
	public string Mobile { get; set; } 
 
	[MaxLength(20)]
	public string Office { get; set; } 
 
	[MaxLength(132)]
	public byte[] Password { get; set; } 
 
	[Required]
	public Guid RequestorId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int RoleId { get; set; } 
 
	[MaxLength(140)]
	public byte[] Salt { get; set; } 
 
	[MaxLength(50)]
	public string SecurityAnswer { get; set; } 

	public Nullable<int> SecurityQuestionId { get; set; } 

	public Nullable<int> StateId { get; set; } 
 
	[MaxLength(50)]
	public string Title { get; set; } 
 
	[MaxLength(100)]
	public string TwitterUrl { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int UserId { get; set; } 
 
	[MaxLength(50)]
	public string UserName { get; set; } 

	public Nullable<Guid> VerificationCode { get; set; } 
 
	[MaxLength(10)]
	public string ZipCode { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Nullable<Status> StatusId { get; set; } 
	[InverseProperty("User")]
	public ICollection<ProjectModuleReviewer> ProjectModuleReviewers { get; set; } 

	[InverseProperty("User")]
	public ICollection<ProjectModuleAssignee> ProjectModuleAssignees { get; set; } 

	[InverseProperty("User")]
	public ICollection<OurTeamMember> OurTeamMembers { get; set; } 

	[InverseProperty("User")]
	public ICollection<UserMessage> UserMessages { get; set; } 

	[InverseProperty("User1")]
	public ICollection<UserMessage> UserMessages1 { get; set; } 

	[InverseProperty("User")]
	public ICollection<RecentActivityAndNotification> RecentActivityAndNotifications { get; set; } 


	public User()
	{
	this.ProjectModuleReviewers = new HashSet<ProjectModuleReviewer>();

	this.ProjectModuleAssignees = new HashSet<ProjectModuleAssignee>();

	this.OurTeamMembers = new HashSet<OurTeamMember>();

	this.UserMessages = new HashSet<UserMessage>();

	this.UserMessages1 = new HashSet<UserMessage>();

	this.RecentActivityAndNotifications = new HashSet<RecentActivityAndNotification>();

    }

    }
}

