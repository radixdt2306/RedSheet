
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("PowerTypeDetails", Schema = "dbo")]
	[Serializable]
	public partial class PowerTypeDetail  
	{
 
	[Required]
	public bool IsOurKnowledge { get; set; } 
 
	[Required]
	public bool IsTheirKnowledge { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PowerTypeDetailId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string Rationale { get; set; } 
	///<summary>
    ///{{PowerProjection}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public PowerProjection ActualId { get; set; } 
 
	[RelationshipTableAttribue("PowerTypes","dbo")]
	//Relationships
	public int PowerTypeId { get; set; } 
 
	[ForeignKey("PowerTypeId")]
	public PowerType PowerType { get; set; } 
	///<summary>
    ///{{PowerProjection}}
    ///</summary> 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public PowerProjection ProjectedId { get; set; } 
 
	[RelationshipTableAttribue("ProjectPowers","dbo")]
	//Relationships
	public int ProjectPowerId { get; set; } 
 
	[ForeignKey("ProjectPowerId")]
	public ProjectPower ProjectPower { get; set; } 

	public PowerTypeDetail()
	{
    }

    }
}

