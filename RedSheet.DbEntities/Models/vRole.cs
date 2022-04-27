
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vRoles", Schema = "dbo")]
	[Serializable]
	public partial class vRole  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int RoleId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string RoleName { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Status { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int StatusId { get; set; } 

	public vRole()
	{
    }

    }
}

