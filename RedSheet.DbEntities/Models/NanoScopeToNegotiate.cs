
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("NanoScopeToNegotiates", Schema = "dbo")]
	[Serializable]
	public partial class NanoScopeToNegotiate  
	{
 
	[Required] 
	[MaxLength(200)]
	public string ClassName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoScopeToNegotiateId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string NanoScopeToNegotiateName { get; set; } 
	[InverseProperty("NanoScopeToNegotiate")]
	public ICollection<NanoScopeToNegotiateObjective> NanoScopeToNegotiateObjectives { get; set; } 


	public NanoScopeToNegotiate()
	{
	this.NanoScopeToNegotiateObjectives = new HashSet<NanoScopeToNegotiateObjective>();

    }

    }
}

