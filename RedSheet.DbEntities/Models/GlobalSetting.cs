
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("GlobalSettings", Schema = "dbo")]
	[Serializable]
	public partial class GlobalSetting  
	{
 
	[Required]
	public bool AutoTranslation { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ConfigurationId { get; set; } 
 
	[MaxLength(10)]
	public string LockDuration { get; set; } 

	public Nullable<int> PasswordPolicy { get; set; } 
 
	[Required]
	public bool RecordLock { get; set; } 
 
	[Required]
	public bool RequestLogging { get; set; } 
 
	[Required]
	public bool SocialAuth { get; set; } 
 
	[Required]
	public bool TwoFactorAuthentication { get; set; } 
 
	[RelationshipTableAttribue("ApplicationTimeZones","dbo")]
	//Relationships
	public int ApplicationTimeZoneId { get; set; } 
 
	[ForeignKey("ApplicationTimeZoneId")]
	public ApplicationTimeZone ApplicationTimeZone { get; set; } 
 
	[RelationshipTableAttribue("Languages","dbo")]
	//Relationships
	public int LanguageId { get; set; } 
 
	[ForeignKey("LanguageId")]
	public Language Language { get; set; } 

	public GlobalSetting()
	{
    }

    }
}

