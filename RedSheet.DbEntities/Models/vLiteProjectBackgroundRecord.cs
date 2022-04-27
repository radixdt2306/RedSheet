
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteProjectBackgroundRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteProjectBackgroundRecord  
	{
 
	[Required]
	public System.DateTime DateOfNegotiation { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Focus { get; set; } 
 
	[Required] 
	[MaxLength(250)]
	public string KnowAboutThem { get; set; } 
 
	[Required] 
	[MaxLength(150)]
	public string KnownIssues { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteProjectBackgroundId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int liteRelationshipRequireId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string location { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string OpponentName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Reason { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ValueObjectiveId { get; set; } 

	public vLiteProjectBackgroundRecord()
	{
    }

    }
}

