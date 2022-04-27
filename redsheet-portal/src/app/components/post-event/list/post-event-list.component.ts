import { Component, ComponentFactoryResolver } from "@angular/core"
import { RxValidation } from "@rx/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RxToast, RxDialog, RxPopup } from "@rx/view";
import { ApplicationBroadcaster } from "@rx/core";
import { ProjectModuleHelpDetailComponent } from "app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component";
import { ProjectModuleEditComponent } from "app/components/project-module/project-modules/edit/project-module-edit.component";
import { ProjectPostEventActionAddComponent } from "app/components/project-module/project-post-event-actions/add/project-post-event-action-add.component";
import { ProjectPostEventActionEditComponent } from "app/components/project-module/project-post-event-actions/edit/project-post-event-action-edit.component";
import { ProjectImplementationPlanAddComponent } from "app/components/project-module/project-implementation-plans/add/project-implementation-plan-add.component";
import { ProjectImplementationPlanEditComponent } from "app/components/project-module/project-implementation-plans/edit/project-implementation-plan-edit.component";
import { SHOW_SIDE_BAR } from "app/const";
import { ProjectModuleStatic } from "app/domain/project-module.static";
import { Observable } from "rxjs/Observable";


@Component({
    templateUrl: './post-event-list.component.html',
    entryComponents: [ProjectModuleEditComponent, ProjectModuleHelpDetailComponent, ProjectPostEventActionAddComponent, ProjectPostEventActionEditComponent, ProjectImplementationPlanAddComponent, ProjectImplementationPlanEditComponent]

})
export class PostEventListComponent {
    projectModuleId: number;
    showComponent: boolean = false;
    isLocked: boolean = false
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private dialog: RxDialog,
        private popup: RxPopup,
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        //super(); 
         
        this.popup.setComponent(componentFactoryResolver);
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
    }

    ngOnInit(): void {
        this.showComponent = true;
    }


    contentDisable(res) {
        this.isLocked = res;
    }
}