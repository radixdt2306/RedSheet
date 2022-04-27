
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Cultures", Schema = "dbo")]
	[Serializable]
	public partial class Culture  
	{
 
	[Range(1, int.MaxValue)]
	public int CultureCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CultureId { get; set; } 
 
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
 
	[RelationshipTableAttribue("ProjectCultures","dbo")]
	//Relationships
	public int ProjectCultureId { get; set; } 
 
	[ForeignKey("ProjectCultureId")]
	public ProjectCulture ProjectCulture { get; set; } 

	public Culture()
	{
    }

    }
}

