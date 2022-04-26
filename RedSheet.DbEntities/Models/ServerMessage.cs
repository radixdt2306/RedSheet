
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ServerMessages", Schema = "dbo")]
	[Serializable]
	public partial class ServerMessage  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ServerMessageId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string ServerMessageName { get; set; } 

	public ServerMessage()
	{
    }

    }
}

