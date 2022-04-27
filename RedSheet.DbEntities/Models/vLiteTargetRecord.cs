
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteTargetRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteTargetRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteProjectBackgroundId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string LiteTargetDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int LiteTargetId { get; set; } 

	public vLiteTargetRecord()
	{
    }

    }
}

