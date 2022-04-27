
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLanguageContentTypes", Schema = "dbo")]
	[Serializable]
	public partial class vLanguageContentType  
	{
 
	[Key]
	public int LanguageContentTypeId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string LanguageContentTypeName { get; set; } 

	public vLanguageContentType()
	{
    }

    }
}

