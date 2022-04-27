
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LanguageContents", Schema = "dbo")]
	[Serializable]
	public partial class LanguageContent  
	{

	public string Amharic { get; set; } 

	public string Bashkir { get; set; } 
	///<summary>
    ///This is Only Used for Server Message Or Server side keys operations.
    ///</summary> 
	[MaxLength(50)]
	public string ContentType { get; set; } 

	public string English { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LanguageContentId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LanguageContentName { get; set; } 

	public string Zulu { get; set; } 
	[InverseProperty("LanguageContent")]
	public ICollection<EmailTemplateDetail> EmailTemplateDetails { get; set; } 

	[InverseProperty("LanguageContent")]
	public ICollection<ModuleContent> ModuleContents { get; set; } 


	public LanguageContent()
	{
	this.EmailTemplateDetails = new HashSet<EmailTemplateDetail>();

	this.ModuleContents = new HashSet<ModuleContent>();

    }

    }
}

