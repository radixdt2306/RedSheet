
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("BatnaDetails", Schema = "dbo")]
	[Serializable]
	public partial class BatnaDetail  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int BatnaDetailId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string BatnaDetailValue { get; set; } 
	[InverseProperty("BatnaDetail")]
	public ICollection<Ourbatna> Ourbatnas { get; set; } 

	[InverseProperty("BatnaDetail")]
	public ICollection<TheirBatna> TheirBatnas { get; set; } 


	public BatnaDetail()
	{
	this.Ourbatnas = new HashSet<Ourbatna>();

	this.TheirBatnas = new HashSet<TheirBatna>();

    }

    }
}

