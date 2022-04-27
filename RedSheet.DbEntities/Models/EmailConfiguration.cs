
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("EmailConfiguration", Schema = "dbo")]
	[Serializable]
	public partial class EmailConfiguration  
	{

	public Nullable<bool> DefaultCredentials { get; set; } 
 
	[MaxLength(100)]
	public string DeliveryMethod { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EmailConfigurationId { get; set; } 

	public Nullable<bool> EnableSSL { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Host { get; set; } 

	public Nullable<bool> IsActive { get; set; } 
 
	[MaxLength(100)]
	public string Password { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int Port { get; set; } 
 
	[MaxLength(200)]
	public string UserName { get; set; } 

	public EmailConfiguration()
	{
    }

    }
}

