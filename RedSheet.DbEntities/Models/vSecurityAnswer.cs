
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vSecurityAnswers", Schema = "dbo")]
	[Serializable]
	public partial class vSecurityAnswer  
	{
 
	[MaxLength(50)]
	public string SecurityAnswer { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string SecurityQuestionName { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int UserId { get; set; } 
 
	[MaxLength(50)]
	public string UserName { get; set; } 

	public vSecurityAnswer()
	{
    }

    }
}

