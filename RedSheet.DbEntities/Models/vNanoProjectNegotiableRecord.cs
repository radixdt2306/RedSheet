
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoProjectNegotiableRecords", Schema = "dbo")]
	[Serializable]
	public partial class vNanoProjectNegotiableRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string ldo { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string mdo { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoProjectNegotiableId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Requirement { get; set; } 

	public vNanoProjectNegotiableRecord()
	{
    }

    }
}

