
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("PowerTypes", Schema = "dbo")]
	[Serializable]
	public partial class PowerType  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PowerTypeId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string PowerTypeName { get; set; } 
	[InverseProperty("PowerType")]
	public ICollection<PowerTypeDetail> PowerTypeDetails { get; set; } 


	public PowerType()
	{
	this.PowerTypeDetails = new HashSet<PowerTypeDetail>();

    }

    }
}

