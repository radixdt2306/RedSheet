using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class DeleteValidationModel
    {
        [Key]
        public int Id { get; set; }
        public bool Result { get; set; }
    }
}
