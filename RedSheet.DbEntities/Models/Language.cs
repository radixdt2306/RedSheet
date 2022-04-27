
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Languages", Schema = "dbo")]
	[Serializable]
	public partial class Language  
	{
 
	[Required]
	public bool Active { get; set; } 

	public Nullable<bool> AutoTranslate { get; set; } 
 
	[Required] 
	[MaxLength(2)]
	public string LanguageCode { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LanguageId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LanguageName { get; set; } 
	[InverseProperty("Language")]
	public ICollection<EmailTemplateDetail> EmailTemplateDetails { get; set; } 

	[InverseProperty("Language")]
	public ICollection<GlobalSetting> GlobalSettings { get; set; } 


	public Language()
	{
	this.EmailTemplateDetails = new HashSet<EmailTemplateDetail>();

	this.GlobalSettings = new HashSet<GlobalSetting>();

    }

    }
}

