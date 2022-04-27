using System.Collections.Generic;

namespace RedSheet.ViewModels.Models
{
    public class SectionModel
    {
        public string SectionName { get; set; }

        public int ApplicationModuleId { get; set; }

        public List<AccessItemModel> AccessItems { get; set; }
    }
}
