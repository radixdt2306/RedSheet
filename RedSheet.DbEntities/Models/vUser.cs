
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vUsers", Schema = "dbo")]
	[Serializable]
	public partial class vUser  
	{
 
	[Required] 
	[MaxLength(100)]
	public string Address { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string City { get; set; } 

	public Nullable<Guid> CompanyId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string CompanyName { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string Email { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string FirstName { get; set; } 
 
	[Required] 
	[MaxLength(6)]
	public string Initial { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LastName { get; set; } 
 
	[Required] 
	[MaxLength(20)]
	public string Mobile { get; set; } 
 
	[Required] 
	[MaxLength(20)]
	public string Office { get; set; } 

	public Nullable<Guid> RequestorId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string State { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Status { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string Title { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int UserId { get; set; } 
 
	[Required] 
	[MaxLength(10)]
	public string ZipCode { get; set; } 

	public vUser()
	{
    }

    }
}

