
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ConfigurationContents", Schema = "dbo")]
	[Serializable]
	public partial class ConfigurationContent  
	{

	public string Abkhazian { get; set; } 

	public string Amharic { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ConfigurationContentId { get; set; } 
 
	[Required]
	public string ConfigurationContentName { get; set; } 
 
	[Required]
	public string English { get; set; } 

	public string French { get; set; } 

	public string Zulu { get; set; } 

	public ConfigurationContent()
	{
    }

    }
}

