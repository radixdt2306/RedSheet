
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("SuggestedActions", Schema = "dbo")]
	[Serializable]
	public partial class SuggestedAction  
	{
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int SuggestedActionId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string SuggestedActionValue { get; set; } 

	public SuggestedAction()
	{
    }

    }
}

