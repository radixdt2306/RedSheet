
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vApplicationTimeZones", Schema = "dbo")]
	[Serializable]
	public partial class vApplicationTimeZone  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationTimeZoneId { get; set; } 
 
	[Required] 
	[MaxLength(153)]
	public string ApplicationTimeZoneName { get; set; } 

	public vApplicationTimeZone()
	{
    }

    }
}

