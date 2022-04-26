import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vCommunicationPlan } from 'app/database-models';
import { CommunicationPlansService } from '../communication-plans.service';
import { CommunicationPlanDomain } from '../domain/communication-plan.domain';

import { CommunicationPlanAddComponent } from 'app/components/project-preparation/communication-plans/add/communication-plan-add.component';
import { CommunicationPlanEditComponent } from 'app/components/project-preparation/communication-plans/edit/communication-plan-edit.component';

@Component({
    selector:'app-communication-plan-list',
    templateUrl: './communication-plan-list.component.html',
	//entryComponents : [  ]
})
export class CommunicationPlanListComponent extends CommunicationPlanDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    communicationPlans: vCommunicationPlan[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
	@Input()  projectPreparationId :number;
    @Input() isLocked:boolean;
    constructor(
        private communicationPlansService: CommunicationPlansService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  
    this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.communicationPlansService.get(this.projectPreparationId).subscribe(communicationPlans => {
            this.communicationPlans = communicationPlans;
            this.showComponent = true;
        });
    }

	showCommunicationPlanAddComponent(vCommunicationPlan: vCommunicationPlan): void {
        document.body.className = "modal-open";
        
        this.popup.show(CommunicationPlanAddComponent, {projectPreparationId: this.projectPreparationId, communicationPlanId: vCommunicationPlan.communicationPlanId }).then(t => this.ngOnInit());
    }
	showCommunicationPlanEditComponent(vCommunicationPlan: vCommunicationPlan): void {
        document.body.className = "modal-open";
        
        this.popup.show(CommunicationPlanEditComponent, {projectPreparationId: this.projectPreparationId, communicationPlanId: vCommunicationPlan.communicationPlanId }).then(t => this.ngOnInit());
    }

    showCommunicationPlanDeleteComponent(vCommunicationPlan: vCommunicationPlan): void {
                
		this.dialog.confirmation([vCommunicationPlan.to], "delete").then(dialogClick => {
            
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.communicationPlansService.delete(this.projectPreparationId,vCommunicationPlan.communicationPlanId).subscribe(t => {
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
        if (this.deleteSubscription)
            this.deleteSubscription.unsubscribe();
        super.destroy();
    }
}
