import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vProjectPostEventAction } from 'app/database-models';
import { ProjectPostEventActionsService } from '../project-post-event-actions.service';
import { ProjectPostEventActionDomain } from '../domain/project-post-event-action.domain';

import { ProjectPostEventActionAddComponent } from 'app/components/project-module/project-post-event-actions/add/project-post-event-action-add.component';
import { ProjectPostEventActionEditComponent } from 'app/components/project-module/project-post-event-actions/edit/project-post-event-action-edit.component';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';

@Component({
    selector:'app-project-post-event-action-list',
    templateUrl: './project-post-event-action-list.component.html',
	entryComponents : [ ProjectPostEventActionAddComponent,ProjectPostEventActionEditComponent,ProjectModuleHelpDetailComponent,]
})
export class ProjectPostEventActionListComponent extends ProjectPostEventActionDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectPostEventActions: vProjectPostEventAction[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input()  projectModuleId :number;
    @Input()  projectPostEventActionId :number;
    @Input() isLocked:boolean;
    constructor(
        private projectPostEventActionsService: ProjectPostEventActionsService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectPostEventActionsService.get(this.projectModuleId).subscribe(projectPostEventActions => {
            this.projectPostEventActions = projectPostEventActions;
            this.showComponent = true;
        });
    }

	showProjectPostEventActionAddComponent(vProjectPostEventAction: vProjectPostEventAction): void {        
        document.body.className = "modal-open";
        this.popup.show(ProjectPostEventActionAddComponent, { projectModuleId: this.projectModuleId, projectPostEventActionId: vProjectPostEventAction.projectPostEventActionId }).then(t => this.ngOnInit());
    }
	showProjectPostEventActionEditComponent(vProjectPostEventAction: vProjectPostEventAction): void {        
        document.body.className = "modal-open";
        this.popup.show(ProjectPostEventActionEditComponent, { projectModuleId: this.projectModuleId, projectPostEventActionId: vProjectPostEventAction.projectPostEventActionId }).then(t => this.ngOnInit());
    }

    showProjectPostEventActionDeleteComponent(vProjectPostEventAction: vProjectPostEventAction): void {
        this.dialog.confirmation([vProjectPostEventAction.postEventActionBy], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.deleteSubscription = this.projectPostEventActionsService.delete(this.projectPostEventActionId,vProjectPostEventAction.projectPostEventActionId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
