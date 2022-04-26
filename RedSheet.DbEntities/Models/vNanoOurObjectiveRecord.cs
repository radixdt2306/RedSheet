
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoOurObjectiveRecords", Schema = "dbo")]
	[Serializable]
	public partial class vNanoOurObjectiveRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoOurObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string NanoOurObjectiveValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NanoScopeToNegotiateObjectiveId { get; set; } 

	public vNanoOurObjectiveRecord()
	{
    }

    }
}

