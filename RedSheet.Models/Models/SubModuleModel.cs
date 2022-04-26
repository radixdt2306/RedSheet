using System.Collections.Generic;

namespace RedSheet.ViewModels.Models
{
    public class SubModuleModel
    {
        public int SubModuleId { get; set; }

        public int ApplicationModuleId { get; set; }

        public List<AccessItemModel> AccessItems { get; set; }

        public List<SectionModel> Sections { get; set; }
    }
}
