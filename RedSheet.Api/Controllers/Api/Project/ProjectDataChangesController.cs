using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
namespace RedSheet.Api.Controllers
{
    [Route("api/projects/{id}/datachanges")]
    public class ProjectDataChangesController : BaseController
    {
        public ProjectDataChangesController(IProjectUow projectUow)
        {
            Uow.Project = projectUow;
        }
		
    }
}
