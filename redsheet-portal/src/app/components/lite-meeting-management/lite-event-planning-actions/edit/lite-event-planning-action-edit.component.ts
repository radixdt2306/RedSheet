import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteEventPlanningAction, vLiteEventPlanningAction, vLiteEventPlanningActionRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { LiteEventPlanningActionsService } from '../lite-event-planning-actions.service';
import { LiteEventPlanningActionDomain } from '../domain/lite-event-planning-action.domain';
import { LiteEventPlanningActionLookupGroup } from '../domain/lite-event-planning-action.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-event-planning-action-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class LiteEventPlanningActionEditComponent extends LiteEventPlanningActionDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteEventPlanningActionFormGroup: FormGroup;
    editSubscription: Subscription;
    listSubscription: Subscription;
    manualEntered: boolean = true;
    liteEventPlanningActionLookupGroup: LiteEventPlanningActionLookupGroup;;
    @Input() liteEventPlanningActionId: number;
    @Input() liteMeetingManagementId: number;
    @Input() projectModuleId: number;
    ourTeamMembers: any;

    validMessageLiteEventPlanningActionBy: ValidMessage;
    validMessageLiteEventPlanningActionDetail: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteEventPlanningActionsService: LiteEventPlanningActionsService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.liteEventPlanningActionsService.getBy(this.liteMeetingManagementId, [this.liteEventPlanningActionId]).subscribe(
            (response: vLiteEventPlanningActionRecord) => {

                if (this.listSubscription)
                    this.listSubscription.unsubscribe();
                this.listSubscription = this.liteEventPlanningActionsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
                    this.ourTeamMembers = result.Users;
                    this.liteEventPlanningActionLookupGroup = new LiteEventPlanningActionLookupGroup();
                    this.liteEventPlanningActionLookupGroup.liteEventPlanningAction = new LiteEventPlanningAction(response);
                    this.liteEventPlanningActionFormGroup = this.validation.getFormGroup(this.liteEventPlanningActionLookupGroup.liteEventPlanningAction);

                    this.validMessageLiteEventPlanningActionBy = new ValidMessage();
                    this.validMessageLiteEventPlanningActionDetail = new ValidMessage();

                    this.onSearchChangeEventPlanningActionDetail(this.liteEventPlanningActionFormGroup.controls.liteEventPlanningActionDetail.value,
                        this.liteEventPlanningActionFormGroup.controls.liteEventPlanningActionDetail.value == '' ? true : false);
                    this.onSearchChangeLiteEventPlanningActionBy(this.liteEventPlanningActionFormGroup.controls.liteEventPlanningActionBy.value,
                        this.liteEventPlanningActionFormGroup.controls.liteEventPlanningActionBy.value == '' ? true : false);

                    this.showComponent = true;
                });
            });
    }

    editLiteEventPlanningAction(): void {
        let todayDate = new Date();
        let liteEventPlanningAction: LiteEventPlanningAction = this.liteEventPlanningActionFormGroup.value;
        if (liteEventPlanningAction.liteEventPlanningActionOn > todayDate) {
            this.editSubscription = this.liteEventPlanningActionsService.put(this.liteMeetingManagementId, this.liteEventPlanningActionFormGroup.value).subscribe(t => {
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
        this.popup.hide(LiteEventPlanningActionEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
