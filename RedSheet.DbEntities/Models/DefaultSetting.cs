
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("DefaultSettings", Schema = "dbo")]
	[Serializable]
	public partial class DefaultSetting  
	{
 
	[Required]
	public decimal Cost { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int DefaultSettingId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string DefaultSettingName { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Status StatusId { get; set; } 

	public DefaultSetting()
	{
    }

    }
}

