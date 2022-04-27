
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vCountries", Schema = "dbo")]
	[Serializable]
	public partial class vCountry  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CountryId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string CountryName { get; set; } 

	public vCountry()
	{
    }

    }
}

