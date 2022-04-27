
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("EmailTemplateDetails", Schema = "dbo")]
	[Serializable]
	public partial class EmailTemplateDetail  
	{
 
	[Required] 
	[MaxLength(10)]
	public string Action { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int EmailTemplateDetailId { get; set; } 
 
	[RelationshipTableAttribue("ApplicationModules","dbo")]
	//Relationships
	public int ApplicationModuleId { get; set; } 
 
	[ForeignKey("ApplicationModuleId")]
	public ApplicationModule ApplicationModule { get; set; } 
 
	[RelationshipTableAttribue("EmailTemplates","dbo")]
	//Relationships
	public int EmailTemplateId { get; set; } 
 
	[ForeignKey("EmailTemplateId")]
	public EmailTemplate EmailTemplate { get; set; } 
 
	[RelationshipTableAttribue("LanguageContents","dbo")]
	//Relationships
	public int LanguageContentId { get; set; } 
 
	[ForeignKey("LanguageContentId")]
	public LanguageContent LanguageContent { get; set; } 
 
	[RelationshipTableAttribue("Languages","dbo")]
	//Relationships
	public int LanguageId { get; set; } 
 
	[ForeignKey("LanguageId")]
	public Language Language { get; set; } 

	public EmailTemplateDetail()
	{
    }

    }
}

