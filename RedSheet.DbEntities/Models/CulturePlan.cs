
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("CulturePlans", Schema = "dbo")]
	[Serializable]
	public partial class CulturePlan  
	{
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int CulturePlanId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string CulturePlanValue { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public CulturePlanCategory CulturePlanCategoryId { get; set; } 
	[InverseProperty("CulturePlan")]
	public ICollection<ProjectCulturePlan> ProjectCulturePlans { get; set; } 


	public CulturePlan()
	{
	this.ProjectCulturePlans = new HashSet<ProjectCulturePlan>();

    }

    }
}

