
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vPowerTypes", Schema = "dbo")]
	[Serializable]
	public partial class vPowerType  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PowerTypeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string PowerTypeName { get; set; } 

	public vPowerType()
	{
    }

    }
}

