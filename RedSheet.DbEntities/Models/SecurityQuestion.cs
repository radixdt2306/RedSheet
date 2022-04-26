
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("SecurityQuestions", Schema = "dbo")]
	[Serializable]
	public partial class SecurityQuestion  
	{
 
	[Required]
	public bool Active { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int SecurityQuestionId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string SecurityQuestionName { get; set; } 

	public SecurityQuestion()
	{
    }

    }
}

