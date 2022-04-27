
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vRecordStatuses", Schema = "dbo")]
	[Serializable]
	public partial class vRecordStatus  
	{
 
	[Key]
	public int RecordStatusId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string RecordStatusName { get; set; } 

	public vRecordStatus()
	{
    }

    }
}

