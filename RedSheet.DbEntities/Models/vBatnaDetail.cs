
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vBatnaDetails", Schema = "dbo")]
	[Serializable]
	public partial class vBatnaDetail  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int BatnaDetailId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string BatnaDetailValue { get; set; } 

	public vBatnaDetail()
	{
    }

    }
}

