import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vEventPlanningAction } from 'app/database-models';
import { EventPlanningActionsService } from '../event-planning-actions.service';
import { EventPlanningActionDomain } from '../domain/event-planning-action.domain';

import { EventPlanningActionAddComponent } from 'app/components/project-preparation/event-planning-actions/add/event-planning-action-add.component';
import { EventPlanningActionEditComponent } from 'app/components/project-preparation/event-planning-actions/edit/event-planning-action-edit.component';

@Component({
    selector: 'app-event-planning-action-list',
    templateUrl: './event-planning-action-list.component.html',

})
export class EventPlanningActionListComponent extends EventPlanningActionDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    eventPlanningActions: vEventPlanningAction[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectPreparationId: number;
    @Input() projectModuleId: number;
    @Input() isLocked: boolean;
    constructor(
        private eventPlanningActionsService: EventPlanningActionsService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.eventPlanningActionsService.get(this.projectPreparationId).subscribe(eventPlanningActions => {
            this.eventPlanningActions = eventPlanningActions;
            this.showComponent = true;
        });
    }

    showEventPlanningActionAddComponent(vEventPlanningAction: vEventPlanningAction): void {
        document.body.className = "modal-open";
        this.popup.show(EventPlanningActionAddComponent, { projectModuleId: this.projectModuleId, projectPreparationId: this.projectPreparationId, eventPlanningActionId: vEventPlanningAction.eventPlanningActionId }).then(t => this.ngOnInit());
    }
    showEventPlanningActionEditComponent(vEventPlanningAction: vEventPlanningAction): void {
        document.body.className = "modal-open";
        this.popup.show(EventPlanningActionEditComponent, { projectModuleId: this.projectModuleId, projectPreparationId: this.projectPreparationId, eventPlanningActionId: vEventPlanningAction.eventPlanningActionId }).then(t => this.ngOnInit());
    }


    showEventPlanningActionDeleteComponent(vEventPlanningAction: vEventPlanningAction): void {

        this.dialog.confirmation([vEventPlanningAction.eventPlanningActionDetail], "delete").then(dialogClick => {

            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.eventPlanningActionsService.delete(this.projectPreparationId, vEventPlanningAction.eventPlanningActionId).subscribe(t => {
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
