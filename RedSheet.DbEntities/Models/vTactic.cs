
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTactics", Schema = "dbo")]
	[Serializable]
	public partial class vTactic  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int TacticId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TacticName { get; set; } 

	public vTactic()
	{
    }

    }
}

