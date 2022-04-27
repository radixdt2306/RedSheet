
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("States", Schema = "dbo")]
	[Serializable]
	public partial class State  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int StateId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string StateName { get; set; } 
 
	[MaxLength(10)]
	public string StateShortName { get; set; } 

	public Nullable<int> StatusId { get; set; } 
 
	[RelationshipTableAttribue("Countries","dbo")]
	//Relationships
	public int CountryId { get; set; } 
 
	[ForeignKey("CountryId")]
	public Country Country { get; set; } 

	public State()
	{
    }

    }
}

