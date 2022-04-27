using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class StoreProcSearchViewModel
    {
        [Key]
        public int Id { get; set; }

        public string Result { get; set; }
    }
}
