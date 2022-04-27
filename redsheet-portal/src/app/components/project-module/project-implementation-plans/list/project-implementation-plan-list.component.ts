import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vProjectImplementationPlan } from 'app/database-models';
import { ProjectImplementationPlansService } from '../project-implementation-plans.service';
import { ProjectImplementationPlanDomain } from '../domain/project-implementation-plan.domain';

import { ProjectImplementationPlanAddComponent } from 'app/components/project-module/project-implementation-plans/add/project-implementation-plan-add.component';
import { ProjectImplementationPlanEditComponent } from 'app/components/project-module/project-implementation-plans/edit/project-implementation-plan-edit.component';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';

@Component({
    selector: 'app-project-implementation-plan-list',
    templateUrl: './project-implementation-plan-list.component.html',
    entryComponents: [ProjectImplementationPlanAddComponent, ProjectImplementationPlanEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectImplementationPlanListComponent extends ProjectImplementationPlanDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectImplementationPlans: vProjectImplementationPlan[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectModuleId: number;
    @Input() isLocked: boolean;
    constructor(
        private projectImplementationPlansService: ProjectImplementationPlansService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectImplementationPlansService.get(this.projectModuleId).subscribe(projectImplementationPlans => {
            this.projectImplementationPlans = projectImplementationPlans;
            this.showComponent = true;
        });
    }

    showProjectImplementationPlanAddComponent(vProjectImplementationPlan: vProjectImplementationPlan): void {
        document.body.className = "modal-open";
        this.popup.show(ProjectImplementationPlanAddComponent, { projectModuleId: this.projectModuleId, projectImplementationPlanId: vProjectImplementationPlan.projectImplementationPlanId }).then(t => this.ngOnInit());
    }
    showProjectImplementationPlanEditComponent(vProjectImplementationPlan: vProjectImplementationPlan): void {
        document.body.className = "modal-open";
        this.popup.show(ProjectImplementationPlanEditComponent, { projectModuleId: this.projectModuleId, projectImplementationPlanId: vProjectImplementationPlan.projectImplementationPlanId }).then(t => this.ngOnInit());
    }
    showProjectImplementationPlanDeleteComponent(vProjectImplementationPlan: vProjectImplementationPlan): void {

        this.dialog.confirmation([vProjectImplementationPlan.activity], "delete").then(dialogClick => {

            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.projectImplementationPlansService.delete(this.projectModuleId, vProjectImplementationPlan.projectImplementationPlanId).subscribe(t => {
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
