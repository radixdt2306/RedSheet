
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ApplicationTables", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationTable  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationTableId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ApplicationTableName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TableTypeId { get; set; } 

	public ApplicationTable()
	{
    }

    }
}

