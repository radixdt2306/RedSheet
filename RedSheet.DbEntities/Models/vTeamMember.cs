
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class vTeamMember  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int UserId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string UserName { get; set; } 

	public vTeamMember()
	{
    }

    }
}

