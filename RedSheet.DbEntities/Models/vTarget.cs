
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTargets", Schema = "dbo")]
	[Serializable]
	public partial class vTarget  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectNegotiationId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string TargetDetail { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TargetId { get; set; } 

	public vTarget()
	{
    }

    }
}

