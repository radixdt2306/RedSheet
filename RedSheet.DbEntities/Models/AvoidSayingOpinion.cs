
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("AvoidSayingOpinions", Schema = "dbo")]
	[Serializable]
	public partial class AvoidSayingOpinion  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int AvoidSayingOpinionId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string AvoidSayingOpinionValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 

	public AvoidSayingOpinion()
	{
    }

    }
}

