
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("PasswordPolicies", Schema = "dbo")]
	[Serializable]
	public partial class PasswordPolicy  
	{
 
	[Required]
	public bool ForcePasswordAlphaNum { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int MinimumNumberOfCharacters { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NumberOfAttempts { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int PasswordExpiryDuration { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int PasswordPolicyId { get; set; } 

	public PasswordPolicy()
	{
    }

    }
}

