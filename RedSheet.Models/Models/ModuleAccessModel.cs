using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class ModuleAccessModel
    {
        [Key]
        public int Id { get; set; }

        public string ModuleAccess { get; set; }
    }
}
