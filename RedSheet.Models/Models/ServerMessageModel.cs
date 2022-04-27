using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class ServerMessageModel
    {
        [Key]
        public int ServerMessageId { get; set; }

        public string Message { get; set; }
    }
}
