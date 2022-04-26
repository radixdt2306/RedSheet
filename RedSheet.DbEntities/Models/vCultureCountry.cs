
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vCultureCountries", Schema = "dbo")]
	[Serializable]
	public partial class vCultureCountry  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CountryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 
 
	[Required]
	public bool IsEgalitarian { get; set; } 
 
	[Required]
	public bool IsIndividualistic { get; set; } 
 
	[Required]
	public bool IsMonochronic { get; set; } 
 
	[Required]
	public bool IsShortTerm { get; set; } 

	public vCultureCountry()
	{
    }

    }
}

