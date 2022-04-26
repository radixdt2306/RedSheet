
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("BackgroundEvents", Schema = "dbo")]
	[Serializable]
	public partial class BackgroundEvent  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int BackgroundEventId { get; set; } 
 
	[MaxLength(1000)]
	public string Description { get; set; } 

	public Nullable<System.DateTime> EndDate { get; set; } 
 
	[Required]
	public bool IsEvent { get; set; } 
 
	[Required]
	public System.DateTime StartDate { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string Title { get; set; } 
 
	[RelationshipTableAttribue("ProjectBackgrounds","dbo")]
	//Relationships
	public int ProjectBackgroundId { get; set; } 
 
	[ForeignKey("ProjectBackgroundId")]
	public ProjectBackground ProjectBackground { get; set; } 

	public BackgroundEvent()
	{
    }

    }
}

