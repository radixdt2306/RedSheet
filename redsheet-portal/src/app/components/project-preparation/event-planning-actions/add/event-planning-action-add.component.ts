import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { EventPlanningAction, } from 'app/database-models';

import { } from 'app/lookups';
import { EventPlanningActionsService } from '../event-planning-actions.service';
import { EventPlanningActionDomain } from '../domain/event-planning-action.domain';
import { EventPlanningActionLookupGroup } from '../domain/event-planning-action.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './event-planning-action-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class EventPlanningActionAddComponent extends EventPlanningActionDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    eventPlanningActionFormGroup: FormGroup;
    addSubscription: Subscription;
    listSubscription: Subscription;
    eventPlanningActionLookupGroup: EventPlanningActionLookupGroup;
    manualEntered: boolean = true;
    @Input() projectPreparationId: number;
    @Input() projectModuleId: number;
    ourTeamMembers: any;
    validMessageEventPlanningActionDetail: ValidMessage;
    validMessageEventPlanningActionBy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private eventPlanningActionsService: EventPlanningActionsService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.eventPlanningActionsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
            this.ourTeamMembers = result.Users;
        });
        this.eventPlanningActionLookupGroup = new EventPlanningActionLookupGroup();
        this.eventPlanningActionLookupGroup.eventPlanningAction = new EventPlanningAction();
        this.eventPlanningActionFormGroup = this.validation.getFormGroup(this.eventPlanningActionLookupGroup.eventPlanningAction);
        this.eventPlanningActionFormGroup.controls.projectPreparationId.setValue(this.projectPreparationId);

        this.validMessageEventPlanningActionDetail = new ValidMessage();
        this.validMessageEventPlanningActionBy = new ValidMessage();

        this.onSearchChangeEventPlanningActionDetail('', true);
        this.onSearchChangeEventPlanningActionBy('', true);
        this.showComponent = true;
    }

    addEventPlanningAction(): void {
        let todayDate = new Date();
        let eventPlanningAction: EventPlanningAction = this.eventPlanningActionFormGroup.value;
        if (eventPlanningAction.eventPlanningActionOn > todayDate) {
            this.addSubscription = this.eventPlanningActionsService.post(this.projectPreparationId, this.eventPlanningActionFormGroup.value).subscribe(t => {
                this.hideEventPlanningAction();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Event Planning Action Date should be greater than today's date ", { status: "error" })
        }
    }

    hideEventPlanningAction(): void {
        document.body.className = "";
        this.popup.hide(EventPlanningActionAddComponent);
    }

    onSearchChangeEventPlanningActionDetail(value, isFirstTime: boolean = false) {
        
        this.validMessageEventPlanningActionDetail = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeEventPlanningActionBy(value, isFirstTime: boolean = false) {
        
        this.validMessageEventPlanningActionBy = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.eventPlanningActionFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
