
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vCommunicationPlanRecords", Schema = "dbo")]
	[Serializable]
	public partial class vCommunicationPlanRecord  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CommunicationPlanId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string MediaMeans { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string Message { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectPreparationId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string To { get; set; } 

	public vCommunicationPlanRecord()
	{
    }

    }
}

