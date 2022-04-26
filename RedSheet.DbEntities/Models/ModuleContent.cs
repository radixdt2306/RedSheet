
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ModuleContents", Schema = "dbo")]
	[Serializable]
	public partial class ModuleContent  
	{

	public string Abkhazian { get; set; } 
 
	[Required] 
	[MaxLength(10)]
	public string Action { get; set; } 

	public string Afar { get; set; } 

	public string Afrikaans { get; set; } 

	public string Amharic { get; set; } 

	public string English { get; set; } 

	public string French { get; set; } 
 
	[MaxLength(20)]
	public string LanguageContentType { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ModuleContentId { get; set; } 

	public Nullable<int> ServerMessageId { get; set; } 

	public string Zulu { get; set; } 
 
	[RelationshipTableAttribue("ApplicationModules","dbo")]
	//Relationships
	public int ApplicationModuleId { get; set; } 
 
	[ForeignKey("ApplicationModuleId")]
	public ApplicationModule ApplicationModule { get; set; } 
 
	[RelationshipTableAttribue("LanguageContents","dbo")]
	//Relationships
	public int LanguageContentId { get; set; } 
 
	[ForeignKey("LanguageContentId")]
	public LanguageContent LanguageContent { get; set; } 

	public ModuleContent()
	{
    }

    }
}

