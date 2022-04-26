
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("NanoOurBatnas", Schema = "dbo")]
	[Serializable]
	public partial class NanoOurBatna  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int NanoOurBatnaId { get; set; } 
 
	[Required] 
	[MaxLength(400)]
	public string NanoOurBatnaValue { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 

	public NanoOurBatna()
	{
    }

    }
}

