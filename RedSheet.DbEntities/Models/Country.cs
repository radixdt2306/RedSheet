
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Countries", Schema = "dbo")]
	[Serializable]
	public partial class Country  
	{
 
	[Required]
	public bool Active { get; set; } 
 
	[Required] 
	[MaxLength(2)]
	public string CountryCode { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CountryId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string CountryName { get; set; } 
 
	[MaxLength(20)]
	public string CurrencyFormat { get; set; } 
 
	[MaxLength(20)]
	public string DateFormat { get; set; } 
 
	[MaxLength(1)]
	public string DateFormatSeperator { get; set; } 
 
	[MaxLength(10)]
	public string DecimalSeperator { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int DefaultLanguageId { get; set; } 
 
	[MaxLength(20)]
	public string PhoneFormat { get; set; } 
 
	[MaxLength(20)]
	public string PostalCodeFormat { get; set; } 
	[InverseProperty("Country")]
	public ICollection<State> States { get; set; } 

	[InverseProperty("Country")]
	public ICollection<CultureCountry> CultureCountries { get; set; } 

	[InverseProperty("Country")]
	public ICollection<Culture> Cultures { get; set; } 


	public Country()
	{
	this.States = new HashSet<State>();

	this.CultureCountries = new HashSet<CultureCountry>();

	this.Cultures = new HashSet<Culture>();

    }

    }
}

