
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("LiteMeetingPlannings", Schema = "dbo")]
	[Serializable]
	public partial class LiteMeetingPlanning  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteMeetingPlanningId { get; set; } 
 
	[Required] 
	[MaxLength(350)]
	public string LiteMeetingPlanningValue { get; set; } 
 
	[RelationshipTableAttribue("LiteMeetingManagements","dbo")]
	//Relationships
	public int LiteMeetingManagementId { get; set; } 
 
	[ForeignKey("LiteMeetingManagementId")]
	public LiteMeetingManagement LiteMeetingManagement { get; set; } 

	public LiteMeetingPlanning()
	{
    }

    }
}

