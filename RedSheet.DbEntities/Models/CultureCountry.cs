
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("CultureCountries", Schema = "dbo")]
	[Serializable]
	public partial class CultureCountry  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CultureCountryId { get; set; } 
 
	[Required]
	public bool IsEgalitarian { get; set; } 
 
	[Required]
	public bool IsIndividualistic { get; set; } 
 
	[Required]
	public bool IsMonochronic { get; set; } 
 
	[Required]
	public bool IsShortTerm { get; set; } 
 
	[RelationshipTableAttribue("Countries","dbo")]
	//Relationships
	public int CountryId { get; set; } 
 
	[ForeignKey("CountryId")]
	public Country Country { get; set; } 

	public CultureCountry()
	{
    }

    }
}

