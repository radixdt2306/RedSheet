
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vGameRecords", Schema = "dbo")]
	[Serializable]
	public partial class vGameRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int GameId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int GameTypeId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Play { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectGameDetailId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Trigger { get; set; } 

	public vGameRecord()
	{
    }

    }
}

