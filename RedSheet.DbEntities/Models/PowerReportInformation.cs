
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("PowerReportInformations", Schema = "dbo")]
	[Serializable]
	public partial class PowerReportInformation  
	{
 
	[MaxLength(100)]
	public string ImageName { get; set; } 
 
	[Required]
	public bool OurPowerKnowledge { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PowerReportInformationId { get; set; } 
 
	[Required]
	public bool TheirPowerKnowledge { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	//Relationships
	public int ActualPowerId { get; set; } 

	public ApplicationObject ApplicationObject { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	//Relationships
	public int ProjectedPowerId { get; set; } 

	public ApplicationObject ApplicationObject1 { get; set; } 

	public PowerReportInformation()
	{
    }

    }
}

