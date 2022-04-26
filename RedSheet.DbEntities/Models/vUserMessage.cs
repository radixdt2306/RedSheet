
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vUserMessages", Schema = "dbo")]
	[Serializable]
	public partial class vUserMessage  
	{
 
	[Required] 
	[MaxLength(100)]
	public string CreatedBy { get; set; } 

	public Nullable<System.DateTime> CreatedOn { get; set; } 
 
	[Required]
	public string Message { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Status { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string UpdatedBy { get; set; } 

	public Nullable<System.DateTime> UpdatedOn { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int UserMessageId { get; set; } 

	public vUserMessage()
	{
    }

    }
}

