
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("CultureSummary", Schema = "dbo")]
	[Serializable]
	public partial class CultureSummary  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CultureSummaryId { get; set; } 

	public string CultureSummaryText { get; set; } 
 
	[Required]
	public bool OurEgalitarian { get; set; } 
 
	[Required]
	public bool OurIndividualistic { get; set; } 
 
	[Required]
	public bool OurMonochronic { get; set; } 
 
	[Required]
	public bool OurShortTerm { get; set; } 
 
	[Required]
	public bool TheirEgalitarian { get; set; } 
 
	[Required]
	public bool TheirIndividualistic { get; set; } 
 
	[Required]
	public bool TheirMonochronic { get; set; } 
 
	[Required]
	public bool TheirShortTerm { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	//Relationships
	public int OurCultureCategoryId { get; set; } 

	public ApplicationObject ApplicationObject { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	//Relationships
	public int TheirCultureCategoryId { get; set; } 

	public ApplicationObject ApplicationObject1 { get; set; } 

	public CultureSummary()
	{
    }

    }
}

