
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("CultureReportInformations", Schema = "dbo")]
	[Serializable]
	public partial class CultureReportInformation  
	{

	public string CultureInformationDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CultureInformationId { get; set; } 
 
	[Required]
	public bool OurCulture { get; set; } 
 
	[Required]
	public bool TheirCulture { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public CultureSummary CultureSummaryId { get; set; } 

	public CultureReportInformation()
	{
    }

    }
}

