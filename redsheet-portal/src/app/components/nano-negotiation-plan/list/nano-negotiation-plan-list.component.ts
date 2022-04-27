import { Component, ComponentFactoryResolver } from "@angular/core"
import { RxValidation } from "@rx/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RxToast, RxDialog, RxPopup } from "@rx/view";
import { ApplicationBroadcaster } from "@rx/core";
import { ProjectModuleHelpDetailComponent } from "app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component";
import { ProjectModuleEditComponent } from "app/components/project-module/project-modules/edit/project-module-edit.component";
import { SHOW_SIDE_BAR } from "app/const";
import { ProjectModuleStatic } from "app/domain/project-module.static";
import { Observable } from "rxjs/Observable";
import { NanoProjectNegotiableListComponent } from "app/components/project-module/nano-project-negotiables/list/nano-project-negotiable-list.component";
import { NanoProjectNegotiableAddComponent } from "app/components/project-module/nano-project-negotiables/add/nano-project-negotiable-add.component";
import { NanoProjectNegotiableEditComponent } from "app/components/project-module/nano-project-negotiables/edit/nano-project-negotiable-edit.component";
import { NanoOurBatnaListComponent } from "app/components/project-module/nano-our-batnas/list/nano-our-batna-list.component";
import { NanoTheirBatnaListComponent } from "app/components/project-module/nano-their-batnas/list/nano-their-batna-list.component";
import { NanoDiscussionSequenceListComponent } from "app/components/project-module/nano-discussion-sequences/list/nano-discussion-sequence-list.component";
import { NanoDiscussionSequenceAddComponent } from "app/components/project-module/nano-discussion-sequences/add/nano-discussion-sequence-add.component";
import { NanoDiscussionSequenceEditComponent } from "app/components/project-module/nano-discussion-sequences/edit/nano-discussion-sequence-edit.component";


@Component({
    templateUrl: './nano-negotiation-plan-list.component.html',
    entryComponents: [ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,NanoProjectNegotiableListComponent,NanoProjectNegotiableAddComponent,
                        NanoProjectNegotiableEditComponent,NanoOurBatnaListComponent,NanoTheirBatnaListComponent,
                        NanoDiscussionSequenceListComponent,NanoDiscussionSequenceAddComponent,NanoDiscussionSequenceEditComponent ]

})
export class NanoNegotiationPlanListComponent {
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