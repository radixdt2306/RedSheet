using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class LanguageContentSearchViewModel
    {
        [Key]
        public int LanguageContentId { get; set; }

        public string LanguageContentName { get; set; }

        public string English { get; set; }

        public string Multilingual { get; set; }

    }
}
