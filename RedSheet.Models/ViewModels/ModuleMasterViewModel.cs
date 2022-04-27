using System.Collections.Generic;

namespace RedSheet.ViewModels.Models
{
    public class ModuleMasterViewModel
    {
        public int ApplicationModuleId { get; set; }
        public int ModuleMasterId { get; set; }

        public List<SubModuleModel> SubModules { get; set; }
    }
}
