
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLanguageContentNames", Schema = "dbo")]
	[Serializable]
	public partial class vLanguageContentName  
	{

	public string English { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LanguageContentId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LanguageContentName { get; set; } 

	public vLanguageContentName()
	{
    }

    }
}

