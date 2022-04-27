
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	///<summary>
    ///Application Objects is used Application wide
    ///</summary>
	[Table("ApplicationObjects", Schema = "dbo")]
	[Serializable]
	public partial class ApplicationObject  
	{
	///<summary>
    ///Main Primary Key
    ///</summary> 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ApplicationObjectId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ApplicationObjectName { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ApplicationObjectTypeId { get; set; } 

	public ApplicationObject()
	{
    }

    }
}

