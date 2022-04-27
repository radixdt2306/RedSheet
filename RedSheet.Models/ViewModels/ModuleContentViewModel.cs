using System.ComponentModel.DataAnnotations;

namespace RedSheet.ViewModels.Models
{
    public class ModuleContentViewModel
    {
        [Key]
        public int ModuleContentId { get; set; }

        public string LanguageContentName { get; set; }

        public string BaseText { get; set; }

        public string ModuleText { get; set; }

        public string English { get; set; }

    }
}
