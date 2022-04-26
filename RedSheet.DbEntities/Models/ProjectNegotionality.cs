
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectNegotionalities", Schema = "dbo")]
	[Serializable]
	public partial class ProjectNegotionality  
	{
 
	[Required]
	public bool IsMarketDifficult { get; set; } 
 
	[Required]
	public bool IsSpendLarge { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectNegotionalityId { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public NegotionalityCategory NegotionalityCategoryId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
	[InverseProperty("ProjectNegotionality")]
	public ICollection<OurTeamMember> OurTeamMembers { get; set; } 


	public ProjectNegotionality()
	{
	this.OurTeamMembers = new HashSet<OurTeamMember>();

    }

    }
}

