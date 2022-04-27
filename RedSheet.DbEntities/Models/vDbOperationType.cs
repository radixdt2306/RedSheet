
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vDbOperationTypes", Schema = "dbo")]
	[Serializable]
	public partial class vDbOperationType  
	{
 
	[Key]
	public int DbOperationTypeId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string DbOperationTypeName { get; set; } 

	public vDbOperationType()
	{
    }

    }
}

