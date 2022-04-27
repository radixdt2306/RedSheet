
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vSuggestedActions", Schema = "dbo")]
	[Serializable]
	public partial class vSuggestedAction  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CultureCountryId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SuggestedActionId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string SuggestedActionValue { get; set; } 

	public vSuggestedAction()
	{
    }

    }
}

