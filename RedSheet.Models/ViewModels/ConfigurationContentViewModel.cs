using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class ConfigurationContentViewModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }

    }
}
