
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("UserMessages", Schema = "dbo")]
	[Serializable]
	public partial class UserMessage  
	{

	public Nullable<System.DateTime> CreatedOn { get; set; } 
 
	[Required]
	public string Message { get; set; } 

	public Nullable<System.DateTime> UpdatedOn { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int UserMessageId { get; set; } 
 
	[RelationshipTableAttribue("Users","dbo")]
	//Relationships
	public int CreatedBy { get; set; } 
 
	[ForeignKey("CreatedBy")]
	public User User { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Nullable<Status> StatusId { get; set; } 
 
	[RelationshipTableAttribue("Users","dbo")]
	//Relationships
	public Nullable<int> UpdatedBy { get; set; } 
 
	[ForeignKey("UpdatedBy")]
	public User User1 { get; set; } 

	public UserMessage()
	{
    }

    }
}

