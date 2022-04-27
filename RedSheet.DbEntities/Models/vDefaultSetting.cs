
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vDefaultSettings", Schema = "dbo")]
	[Serializable]
	public partial class vDefaultSetting  
	{
 
	[Required]
	public decimal Cost { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int DefaultSettingId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string DefaultSettingName { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Status { get; set; } 

	public vDefaultSetting()
	{
    }

    }
}

