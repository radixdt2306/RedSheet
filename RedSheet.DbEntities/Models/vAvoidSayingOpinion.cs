
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vAvoidSayingOpinions", Schema = "dbo")]
	[Serializable]
	public partial class vAvoidSayingOpinion  
	{
 
	[Range(1, int.MaxValue)]
	public int AvoidSayingOpinionId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string AvoidSayingOpinionValue { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CultureCountryId { get; set; } 

	public vAvoidSayingOpinion()
	{
    }

    }
}

