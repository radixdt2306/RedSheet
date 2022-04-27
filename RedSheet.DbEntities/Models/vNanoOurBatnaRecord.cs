
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoOurBatnaRecords", Schema = "dbo")]
	[Serializable]
	public partial class vNanoOurBatnaRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoOurBatnaId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string NanoOurBatnaValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public vNanoOurBatnaRecord()
	{
    }

    }
}

