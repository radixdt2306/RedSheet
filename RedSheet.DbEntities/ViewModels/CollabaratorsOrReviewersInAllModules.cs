using RedSheet.DbEntities.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.DbEntities.ViewModels
{
    public class CollabaratorsOrReviewersInAllModules
    {
        public int ProjectId { get; set; }

        public List<ProjectModuleAssigneesOrReviewer> ProjectModuleAssigneesOrReviewers { get; set; }
    }
}
