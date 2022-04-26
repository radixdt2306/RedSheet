
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("UserHobbies", Schema = "dbo")]
	[Serializable]
	public partial class UserHobby  
	{
 
	[Range(1, int.MaxValue)]
	public int HobbyId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int UserHobbyId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int UserId { get; set; } 

	public UserHobby()
	{
    }

    }
}

