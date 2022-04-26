
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vModuleMasters", Schema = "dbo")]
	[Serializable]
	public partial class vModuleMaster  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ModuleMasterId { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 

	public vModuleMaster()
	{
    }

    }
}

