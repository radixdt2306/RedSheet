
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLongTermObjectiveRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLongTermObjectiveRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LongTermObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string LongTermObjectiveValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectBackgroundId { get; set; } 

	public vLongTermObjectiveRecord()
	{
    }

    }
}

