
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vSMTPSettingRecords", Schema = "dbo")]
	[Serializable]
	public partial class vSMTPSettingRecord  
	{

	public Nullable<bool> IsActive { get; set; } 

	public Nullable<bool> IsSSL { get; set; } 
 
	[MaxLength(100)]
	public string SMTPFromEmailAddress { get; set; } 
 
	[MaxLength(100)]
	public string SMTPHostName { get; set; } 
 
	[MaxLength(100)]
	public string SMTPPassword { get; set; } 

	public Nullable<int> SMTPPort { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int SMTPSettingsId { get; set; } 
 
	[MaxLength(100)]
	public string SMTPUserName { get; set; } 

	public Nullable<int> StatusId { get; set; } 

	public vSMTPSettingRecord()
	{
    }

    }
}

