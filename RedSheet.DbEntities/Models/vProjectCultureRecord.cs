
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectCultureRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectCultureRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CountryId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int CultureCategoryId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int CultureId { get; set; } 
 
	[Required]
	public bool IsEgalitarian { get; set; } 
 
	[Required]
	public bool IsIndividualistic { get; set; } 
 
	[Required]
	public bool IsMonochronic { get; set; } 
 
	[Required]
	public bool IsShortTerm { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectCultureId { get; set; } 

	public vProjectCultureRecord()
	{
    }

    }
}

