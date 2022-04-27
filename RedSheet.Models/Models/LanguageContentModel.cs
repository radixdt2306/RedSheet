using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class LanguageContentModel
    {
        [Key]
        public int Id { get; set; }

        public string Type { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }
    }
}
