
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLanguages", Schema = "dbo")]
	[Serializable]
	public partial class vLanguage  
	{
 
	[Required]
	public bool Active { get; set; } 
 
	[Required] 
	[MaxLength(2)]
	public string LanguageCode { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LanguageId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LanguageName { get; set; } 

	public vLanguage()
	{
    }

    }
}

