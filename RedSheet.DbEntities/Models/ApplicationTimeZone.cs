
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ApplicationTimeZones", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationTimeZone  
	{

	public Nullable<bool> Active { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationTimeZoneId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ApplicationTimeZoneName { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string Comment { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int CountryId { get; set; } 
	[InverseProperty("ApplicationTimeZone")]
	public ICollection<GlobalSetting> GlobalSettings { get; set; } 


	public ApplicationTimeZone()
	{
	this.GlobalSettings = new HashSet<GlobalSetting>();

    }

    }
}

