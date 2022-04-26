
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vSayingOpinions", Schema = "dbo")]
	[Serializable]
	public partial class vSayingOpinion  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CultureCountryId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int SayingOpinionId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string SayingOpinionValue { get; set; } 

	public vSayingOpinion()
	{
    }

    }
}

