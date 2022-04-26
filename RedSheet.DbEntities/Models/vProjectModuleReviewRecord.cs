
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectModuleReviewRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectModuleReviewRecord  
	{
 
	[Required]
	public string Feedback { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectModuleReviewId { get; set; } 

	public vProjectModuleReviewRecord()
	{
    }

    }
}

