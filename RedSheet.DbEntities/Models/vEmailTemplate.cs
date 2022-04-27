
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vEmailTemplates", Schema = "dbo")]
	[Serializable]
	public partial class vEmailTemplate  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EmailTemplateId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int StatusId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string Subject { get; set; } 

	public vEmailTemplate()
	{
    }

    }
}

