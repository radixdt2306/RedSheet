
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectBackGroundRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectBackGroundRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string Focus { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int NegotiationTypeId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OpponentName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectBackgroundId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Reason { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ValueObjectiveId { get; set; } 

	public vProjectBackGroundRecord()
	{
    }

    }
}

