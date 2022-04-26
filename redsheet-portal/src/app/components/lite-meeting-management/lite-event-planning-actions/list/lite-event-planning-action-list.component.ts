import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vLiteEventPlanningAction } from 'app/database-models';
import { LiteEventPlanningActionsService } from '../lite-event-planning-actions.service';
import { LiteEventPlanningActionDomain } from '../domain/lite-event-planning-action.domain';

import { LiteEventPlanningActionAddComponent } from 'app/components/lite-meeting-management/lite-event-planning-actions/add/lite-event-planning-action-add.component';
import { LiteEventPlanningActionEditComponent } from 'app/components/lite-meeting-management/lite-event-planning-actions/edit/lite-event-planning-action-edit.component';

@Component({
    selector:'app-lite-event-planning-action-list',
    templateUrl: './lite-event-planning-action-list.component.html',    
})
export class LiteEventPlanningActionListComponent extends LiteEventPlanningActionDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteEventPlanningActions: vLiteEventPlanningAction[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() isLocked:boolean;
	@Input()  liteMeetingManagementId :number;
    @Input() projectModuleId:number;
    constructor(
        private liteEventPlanningActionsService: LiteEventPlanningActionsService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteEventPlanningActionsService.get(this.liteMeetingManagementId).subscribe(liteEventPlanningActions => {
            this.liteEventPlanningActions = liteEventPlanningActions;
            this.showComponent = true;
        });
    }

	showLiteEventPlanningActionAddComponent(vLiteEventPlanningAction: vLiteEventPlanningAction): void {
        document.body.className = "modal-open";
        this.popup.show(LiteEventPlanningActionAddComponent, { projectModuleId:this.projectModuleId,liteMeetingManagementId: this.liteMeetingManagementId }).then(t => this.ngOnInit());
    }
	showLiteEventPlanningActionEditComponent(vLiteEventPlanningAction: vLiteEventPlanningAction): void {
        document.body.className = "modal-open";
        this.popup.show(LiteEventPlanningActionEditComponent, {projectModuleId:this.projectModuleId, liteEventPlanningActionId: vLiteEventPlanningAction.liteEventPlanningActionId,liteMeetingManagementId: this.liteMeetingManagementId }).then(t => this.ngOnInit());
    }

    showLiteEventPlanningActionDeleteComponent(vLiteEventPlanningAction: vLiteEventPlanningAction): void {
                
		this.dialog.confirmation([vLiteEventPlanningAction.liteEventPlanningActionDetail], "delete").then(dialogClick => {
            
			if (dialogClick == DialogClick.PrimaryOk) {
                
				this.deleteSubscription = this.liteEventPlanningActionsService.delete(this.liteMeetingManagementId,vLiteEventPlanningAction.liteEventPlanningActionId).subscribe(t => {
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
