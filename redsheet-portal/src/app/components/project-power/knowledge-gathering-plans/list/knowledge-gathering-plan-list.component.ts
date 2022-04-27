import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vKnowledgeGatheringPlan } from 'app/database-models';
import { KnowledgeGatheringPlansService } from '../knowledge-gathering-plans.service';
import { KnowledgeGatheringPlanDomain } from '../domain/knowledge-gathering-plan.domain';

import { KnowledgeGatheringPlanAddComponent } from 'app/components/project-power/knowledge-gathering-plans/add/knowledge-gathering-plan-add.component';
import { KnowledgeGatheringPlanEditComponent } from 'app/components/project-power/knowledge-gathering-plans/edit/knowledge-gathering-plan-edit.component';

@Component({
    selector: 'app-knowledge-gathering-plan-list',
    templateUrl: './knowledge-gathering-plan-list.component.html',
    entryComponents: [KnowledgeGatheringPlanAddComponent, KnowledgeGatheringPlanEditComponent,]
})
export class KnowledgeGatheringPlanListComponent extends KnowledgeGatheringPlanDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    knowledgeGatheringPlans: vKnowledgeGatheringPlan[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectPowerId: number;
    @Input() projectModuleId: number;
    @Input() isLocked: boolean;
    constructor(
        private knowledgeGatheringPlansService: KnowledgeGatheringPlansService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.knowledgeGatheringPlansService.get(this.projectPowerId).subscribe(knowledgeGatheringPlans => {
            this.knowledgeGatheringPlans = knowledgeGatheringPlans;
            this.showComponent = true;
        });
    }

    showKnowledgeGatheringPlanAddComponent(vKnowledgeGatheringPlan: vKnowledgeGatheringPlan): void {
        document.body.className = "modal-open";
        this.popup.show(KnowledgeGatheringPlanAddComponent, { projectModuleId: this.projectModuleId, projectPowerId: this.projectPowerId, knowledgeGatheringPlanId: vKnowledgeGatheringPlan.knowledgeGatheringPlanId }).then(t => this.ngOnInit());
    }
    showKnowledgeGatheringPlanEditComponent(vKnowledgeGatheringPlan: vKnowledgeGatheringPlan): void {
        document.body.className = "modal-open";
        this.popup.show(KnowledgeGatheringPlanEditComponent, { projectModuleId: this.projectModuleId, projectPowerId: this.projectPowerId, knowledgeGatheringPlanId: vKnowledgeGatheringPlan.knowledgeGatheringPlanId }).then(t => this.ngOnInit());
    }


    showKnowledgeGatheringPlanDeleteComponent(vKnowledgeGatheringPlan: vKnowledgeGatheringPlan): void {

        this.dialog.confirmation([vKnowledgeGatheringPlan.knowledgeGivenBy], "delete").then(dialogClick => {

            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.knowledgeGatheringPlansService.delete(this.projectPowerId, vKnowledgeGatheringPlan.knowledgeGatheringPlanId).subscribe(t => {
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
