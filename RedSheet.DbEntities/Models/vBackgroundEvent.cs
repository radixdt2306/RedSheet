
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vBackgroundEvents", Schema = "dbo")]
	[Serializable]
	public partial class vBackgroundEvent  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int BackgroundEventId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Description { get; set; } 

	public Nullable<System.DateTime> EndDate { get; set; } 
 
	[Required]
	public bool IsEvent { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectBackgroundId { get; set; } 
 
	[Required]
	public System.DateTime StartDate { get; set; } 
 
	[Required] 
	[MaxLength(1012)]
	public string Title { get; set; } 

	public vBackgroundEvent()
	{
    }

    }
}

