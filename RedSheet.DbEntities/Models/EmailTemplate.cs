
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("EmailTemplates", Schema = "dbo")]
	[Serializable]
	public partial class EmailTemplate  
	{
 
	[Required]
	public string Body { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EmailTemplateId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string EmailTemplateName { get; set; } 
 
	[Required]
	public bool IsActive { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int StatusId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string Subject { get; set; } 
	[InverseProperty("EmailTemplate")]
	public ICollection<EmailTemplateDetail> EmailTemplateDetails { get; set; } 


	public EmailTemplate()
	{
	this.EmailTemplateDetails = new HashSet<EmailTemplateDetail>();

    }

    }
}

