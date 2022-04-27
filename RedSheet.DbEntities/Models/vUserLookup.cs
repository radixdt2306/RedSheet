
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vUserLookups", Schema = "dbo")]
	[Serializable]
	public partial class vUserLookup  
	{
 
	[Required]
	public Guid CompanyId { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string Email { get; set; } 
 
	[Required]
	public Guid RequestorId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int UserId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string UserName { get; set; } 

	public vUserLookup()
	{
    }

    }
}

