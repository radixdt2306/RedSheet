
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ExportReportPDFs", Schema = "dbo")]
	[Serializable]
	public partial class ExportReportPDF  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ExportReportId { get; set; } 
 
	[RelationshipTableAttribue("Projects","dbo")]
	//Relationships
	public int ProjectId { get; set; } 
 
	[ForeignKey("ProjectId")]
	public Project Project { get; set; } 

	public ExportReportPDF()
	{
    }

    }
}

