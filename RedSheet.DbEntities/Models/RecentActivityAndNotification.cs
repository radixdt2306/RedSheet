
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("RecentActivityAndNotifications", Schema = "dbo")]
	[Serializable]
	public partial class RecentActivityAndNotification  
	{
 
	[Required]
	public bool IsNotification { get; set; } 
 
	[Required]
	public bool IsSeen { get; set; } 

	public Nullable<bool> NotificationStatus { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RecentActivityAndNotificationId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string RecentActivityAndNotificationName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TemplateModuleId { get; set; } 
 
	[MaxLength(500)]
	public string TemplateModuleName { get; set; } 

	public Nullable<int> UpdatedBy { get; set; } 

	public Nullable<System.DateTime> UpdatedOn { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string URL { get; set; } 
 
	[RelationshipTableAttribue("Projects","dbo")]
	//Relationships
	public int ProjectId { get; set; } 
 
	[ForeignKey("ProjectId")]
	public Project Project { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
 
	[RelationshipTableAttribue("Users","dbo")]
	//Relationships
	public int UserId { get; set; } 
 
	[ForeignKey("UserId")]
	public User User { get; set; } 

	public RecentActivityAndNotification()
	{
    }

    }
}

