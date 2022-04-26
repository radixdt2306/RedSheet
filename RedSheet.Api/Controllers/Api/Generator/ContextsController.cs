using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.GeneratorDbModels;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using System.Collections.Generic;
using System.Linq;

namespace RedSheet.Api.Controllers.Api
{

    [Route("api/[controller]")]
    public class ContextsController : Controller
    {
        private IGeneratorUow GeneratorUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        public ContextsController(IGeneratorUow generatorUow, IMasterUow masterUow)
        {
            GeneratorUow = generatorUow;
            MasterUow = masterUow;
        }


        //[HttpGet]
        //public IActionResult Get()
        //{
        //    List<GeneratorContext> contexts = new List<GeneratorContext>();
        //    GeneratorUow.Repository<GeneratorContext>().All().ToList().ForEach(a =>
        //    {
        //        GeneratorUow.Repository<GeneratorController>().FindBy(controller => controller.GeneratorContextId == a.GeneratorContextId).ToList().ForEach(
        //            context => a.GeneratorControllers.Add(context)
        //        );
        //        GeneratorUow.Repository<GeneratorContextView>().FindBy(contextView => contextView.GeneratorContextId == a.GeneratorContextId).ToList().ForEach(
        //            context => a.GeneratorContextViews.Add(context)
        //        );
        //        GeneratorUow.Repository<GeneratorContextLookup>().FindBy(lookup => lookup.GeneratorContextId == a.GeneratorContextId).ToList().ForEach(
        //            context => a.GeneratorContextLookups.Add(context)
        //        );
        //        contexts.Add(a);
        //    });
        //    Context c = new Context();
        //    c.generatorModels = Uow.Repository<vGeneratorModel>().FindBy(a => a.GeneratorModelType == "Table");
        //    c.generatorViews = Uow.Repository<vGeneratorModel>().FindBy(a => a.GeneratorModelType == "View");
        //    c.contexts = contexts;
        //    return Ok(c);
        //}


        [HttpGet]
        public IActionResult Get()
        {
            var contexts = GeneratorUow.Repository<GeneratorContext>().All().ToList();
            var contextControllers = GeneratorUow.Repository<GeneratorController>().All().ToList();
            var applicationModules = MasterUow.Repository<vGeneratorContextModule>().All();
            applicationModules.Where(t => t.IsRoot).ToList().ForEach(t =>
            {
                var context = contexts.SingleOrDefault(c => c.ApplicationModuleId == t.ApplicationModuleId);
                if (context == null)
                {
                    context = new GeneratorContext
                    {
                        ApplicationModuleId = t.ApplicationModuleId,
                        ApplicationModuleName = t.ModuleMasterName,
                        GeneratorControllers = new List<GeneratorController>(),
                        IsMainDbContext = false,
                    };
                    GeneratorUow.RegisterNew<GeneratorContext>(context);
                    GeneratorUow.Commit();
                }
                else
                {
                    context.ApplicationModuleName = t.ModuleMasterName;
                    GeneratorUow.RegisterDirty<GeneratorContext>(context);
                    GeneratorUow.Commit();
                }
                applicationModules.Where(ac => ac.ParentApplicationModuleId == t.ApplicationModuleId).ToList().ForEach(ac =>
                {
                    var contextController = contextControllers.SingleOrDefault(cc => cc.ApplicationModuleId == ac.ApplicationModuleId);
                    if (contextController == null)
                    {
                        contextController = new GeneratorController
                        {
                            ApplicationModuleId = ac.ApplicationModuleId,
                            ModuleMasterName = ac.ModuleMasterName,
                            RootModuleId = t.ApplicationModuleId,
                            ComplexityType = false,
                        };
                        if (context.GeneratorContextId == 0)
                        {
                            context.GeneratorControllers.Add(contextController);
                        }
                        else
                        {
                            contextController.GeneratorContextId = context.GeneratorContextId;
                            GeneratorUow.RegisterNew<GeneratorController>(contextController);
                        }
                    }
                    else
                    {
                        contextController.ModuleMasterName = ac.ModuleMasterName;
                        contextController.RootModuleId = t.ApplicationModuleId;
                        GeneratorUow.RegisterDirty<GeneratorController>(contextController);
                    }

                    GeneratorUow.Commit();
                    applicationModules.Where(cm => cm.ParentApplicationModuleId == ac.ApplicationModuleId).ToList().ForEach(cm =>
                    {
                        var contextChildrenController = contextControllers.SingleOrDefault(cc => cc.ApplicationModuleId == cm.ApplicationModuleId);
                        var isShared = applicationModules.FirstOrDefault(x => x.ModuleMasterId == cm.ModuleMasterId && x.ApplicationModuleId != cm.ApplicationModuleId) != null;
                        if (contextChildrenController == null)
                        {
                            var parentController = GeneratorUow.Repository<GeneratorController>().SingleOrDefault(gc => gc.ApplicationModuleId == ac.ApplicationModuleId);
                            contextController = new GeneratorController
                            {
                                ParentControllerId = parentController.GeneratorControllerId,
                                ApplicationModuleId = cm.ApplicationModuleId,
                                ModuleMasterName = cm.ModuleMasterName,
                                ComplexityType = false,
                                IsShared = isShared,
                                RootModuleId = t.ApplicationModuleId,
                                IsChildrenController = !isShared
                            };
                            contextController.GeneratorContextId = parentController.GeneratorContextId;
                            GeneratorUow.RegisterNew<GeneratorController>(contextController);
                        }
                        else
                        {
                            contextChildrenController.ModuleMasterName = cm.ModuleMasterName;
                            contextChildrenController.RootModuleId = t.ApplicationModuleId;
                            GeneratorUow.RegisterDirty<GeneratorController>(contextController);
                        }
                        GeneratorUow.Commit();
                    });
                });
            });

            contexts = GeneratorUow.Repository<GeneratorContext>().AllInclude(t=>t.GeneratorControllers).ToList();
            return Ok(
                new
                {
                    contexts = contexts,
                    generatorModels = GeneratorUow.Repository<GeneratorModel>().FindBy(t=>t.GeneratorModelType == "Table").Select(t => new { t.GeneratorModelId, t.GeneratorModelName }),
                    generatorViews = GeneratorUow.Repository<GeneratorModel>().FindBy(t => t.GeneratorModelType == "View").Select(t => new { t.GeneratorModelId, t.GeneratorModelName })
                }
            );
        }

        [HttpPut]
        public IActionResult Put([FromBody]GeneratorController generatorControlller)
        {
            this.GeneratorUow.RegisterDirty<GeneratorController>(generatorControlller);
            this.GeneratorUow.Commit();
            return Ok();
        }
    }
}
