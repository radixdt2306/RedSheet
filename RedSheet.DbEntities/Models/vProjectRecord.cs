
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectRecords", Schema = "dbo")]
	[Serializable]
	public partial class vProjectRecord  
	{
 
	[Required]
	public bool IsClosed { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int OwnerId { get; set; } 
 
	[Required] 
	[MaxLength(201)]
	public string OwnerName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ProjectName { get; set; } 
 
	[MaxLength(1000)]
	public string ProjectNote { get; set; } 
 
	[Required]
	public bool Status { get; set; } 
 
	[Required]
	public Guid TemplateGroupId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string TemplateGroupName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int TemplateId { get; set; } 

	public vProjectRecord()
	{
    }

    }
}

