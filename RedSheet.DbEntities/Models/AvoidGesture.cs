
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("AvoidGestures", Schema = "dbo")]
	[Serializable]
	public partial class AvoidGesture  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int AvoidGestureId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string AvoidGestureValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 

	public AvoidGesture()
	{
    }

    }
}

