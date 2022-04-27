
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vNanoScopeToNegotiateObjectiveRecords", Schema = "dbo")]
	[Serializable]
	public partial class vNanoScopeToNegotiateObjectiveRecord  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string Buy { get; set; } 
 
	[Required]
	public System.DateTime Date { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Focus { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string KnowAboutThem { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int NanoRelationshipRequireId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int NanoScopeToNegotiateId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int NanoScopeToNegotiateObjectiveId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string OpponentName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Reason { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ValueObjectiveId { get; set; } 

	public vNanoScopeToNegotiateObjectiveRecord()
	{
    }

    }
}

