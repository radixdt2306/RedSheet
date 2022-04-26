import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteEventPlanningAction, } from 'app/database-models';

import { } from 'app/lookups';
import { LiteEventPlanningActionsService } from '../lite-event-planning-actions.service';
import { LiteEventPlanningActionDomain } from '../domain/lite-event-planning-action.domain';
import { LiteEventPlanningActionLookupGroup } from '../domain/lite-event-planning-action.models';
import { RxPopup } from '@rx';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './lite-event-planning-action-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class LiteEventPlanningActionAddComponent extends LiteEventPlanningActionDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    liteEventPlanningActionFormGroup: FormGroup;
    listSubscription: Subscription;
    addSubscription: Subscription;
    liteEventPlanningActionLookupGroup: LiteEventPlanningActionLookupGroup;;
    manualEntered: boolean = true;
    ourTeamMembers: any;
    @Input() liteMeetingManagementId: number;
    @Input() projectModuleId: number;

    validMessageLiteEventPlanningActionBy: ValidMessage;
    validMessageLiteEventPlanningActionDetail: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private liteEventPlanningActionsService: LiteEventPlanningActionsService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteEventPlanningActionsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
            this.ourTeamMembers = result.Users;
        });

        this.liteEventPlanningActionLookupGroup = new LiteEventPlanningActionLookupGroup();

        this.liteEventPlanningActionLookupGroup.liteEventPlanningAction = new LiteEventPlanningAction();
        this.liteEventPlanningActionFormGroup = this.validation.getFormGroup(this.liteEventPlanningActionLookupGroup.liteEventPlanningAction);
        this.liteEventPlanningActionFormGroup.controls.liteMeetingManagementId.setValue(this.liteMeetingManagementId);

        this.validMessageLiteEventPlanningActionBy = new ValidMessage();
        this.validMessageLiteEventPlanningActionDetail = new ValidMessage();

        this.onSearchChangeEventPlanningActionDetail('', true);
        this.onSearchChangeLiteEventPlanningActionBy('', true);

        this.showComponent = true;
    }

    addLiteEventPlanningAction(): void {
        let todayDate = new Date();
        let liteEventPlanningAction: LiteEventPlanningAction = this.liteEventPlanningActionFormGroup.value;
        if (liteEventPlanningAction.liteEventPlanningActionOn > todayDate) {
            this.addSubscription = this.liteEventPlanningActionsService.post(this.liteMeetingManagementId, this.liteEventPlanningActionFormGroup.value).subscribe(t => {
                this.hideLiteEventPlanningAction();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Event Planning Action Date should be greater than today's date ", { status: "error" })
        }
    }

    hideLiteEventPlanningAction(): void {
        document.body.className = "";
        this.popup.hide(LiteEventPlanningActionAddComponent);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteEventPlanningActionFormGroup.dirty;
    }

    onSearchChangeEventPlanningActionDetail(value, isFirstTime: boolean = false) {
        
        this.validMessageLiteEventPlanningActionDetail = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeLiteEventPlanningActionBy(value, isFirstTime: boolean = false) {
        
        this.validMessageLiteEventPlanningActionBy = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
