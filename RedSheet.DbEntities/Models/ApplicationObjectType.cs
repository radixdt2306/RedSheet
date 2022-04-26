
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ApplicationObjectTypes", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationObjectType  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationObjectTypeId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ApplicationObjectTypeName { get; set; } 

	public ApplicationObjectType()
	{
    }

    }
}

