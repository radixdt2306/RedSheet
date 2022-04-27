
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vPersonalities", Schema = "dbo")]
	[Serializable]
	public partial class vPersonality  
	{
 
	[MaxLength(1000)]
	public string Description { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string PersonalityColor { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PersonalityId { get; set; } 
 
	[MaxLength(50)]
	public string PersonalityKey { get; set; } 
 
	[MaxLength(10)]
	public string PersonalityKeyText { get; set; } 

	public vPersonality()
	{
    }

    }
}

