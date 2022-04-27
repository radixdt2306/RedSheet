import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';


import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { BackgroundEvent, } from 'app/database-models';

import { } from 'app/lookups';
import { BackgroundEventsService } from '../background-events.service';
import { BackgroundEventDomain } from '../domain/background-event.domain';
import { BackgroundEventLookupGroup } from '../domain/background-event.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './background-event-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class BackgroundEventAddComponent extends BackgroundEventDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    backgroundEventFormGroup: FormGroup;
    addSubscription: Subscription;
    editSubscription: Subscription;
    backgroundEventLookupGroup: BackgroundEventLookupGroup;
    @Input() projectBackgroundId: number;
    @Input() BackgroundEventId: number;
    validMessageTitle: ValidMessage;
    validMessageDescription: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private backgroundEventsService: BackgroundEventsService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.backgroundEventLookupGroup = new BackgroundEventLookupGroup();
        this.backgroundEventLookupGroup.backgroundEvent = new BackgroundEvent();
        this.backgroundEventFormGroup = this.validation.getFormGroup(this.backgroundEventLookupGroup.backgroundEvent);
        this.backgroundEventFormGroup.controls.projectBackgroundId.setValue(this.projectBackgroundId);
        this.backgroundEventFormGroup.controls.isEvent.setValue(true);
        this.validMessageTitle = new ValidMessage();
        this.validMessageDescription = new ValidMessage();

        this.onSearchChangeTitle('', true);
        this.onSearchChangeDescription('', true);

        this.showComponent = true;
    }
    // function convert(str) {
    //     var date = new Date(str),
    //         mnth = ("0" + (date.getMonth()+1)).slice(-2),
    //         day  = ("0" + date.getDate()).slice(-2);
    //     return [ date.getFullYear(), mnth, day ].join("-");
    // }
    addBackgroundEvent(): void {
        
        let startDate = this.backgroundEventFormGroup.controls.startDate.value;
        let startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
        let startDay = ("0" + startDate.getDate()).slice(-2);
        let finalStartDate = [startDate.getFullYear(), startMonth, startDay].join("-");

        let endDate = this.backgroundEventFormGroup.controls.endDate.value;
        if (endDate) {
            let endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
            let endDay = ("0" + endDate.getDate()).slice(-2);
            var finalEndDate = [endDate.getFullYear(), endMonth, endDay].join("-");
        }
        if (this.backgroundEventFormGroup.controls.isEvent.value == true && !finalEndDate) {
            this.toast.show("Enter End Date", { status: 'error' });
        }
        else if (this.backgroundEventFormGroup.controls.isEvent.value == true && finalStartDate == finalEndDate) {
            this.toast.show("Start Date and End Date can't same", { status: 'error' });
        }
        else if (this.backgroundEventFormGroup.controls.isEvent.value == true && finalStartDate > finalEndDate) {
            this.toast.show("End Date should be greater than Start Date", { status: 'error' });
        }
        else {
            let todayDate = new Date();
            let projectBackgroundEvent: BackgroundEvent = this.backgroundEventFormGroup.value;
            if ((projectBackgroundEvent.isEvent && projectBackgroundEvent.startDate >= todayDate && projectBackgroundEvent.endDate >= projectBackgroundEvent.startDate) || (!projectBackgroundEvent.isEvent && projectBackgroundEvent.startDate > todayDate)) {
                if (!projectBackgroundEvent.isEvent) {
                    projectBackgroundEvent.endDate = null;
                }
                this.addSubscription = this.backgroundEventsService.post(this.projectBackgroundId, this.backgroundEventFormGroup.value).subscribe(t => {
                    
                    this.HideBackgroundEventAddComponent();
                },
                    error => {
                        this.toast.show(error, { status: 'error' })
                    })
            }

            else {
                this.toast.show("Start Date/End Date should be greater than today's date ", { status: "error" })
            }
        }
    }

    HideBackgroundEventAddComponent(): void {
        document.body.className = "";
        this.popup.hide(BackgroundEventAddComponent);
    }

    onSearchChangeTitle(value, isFirstTime: boolean = false) {
        
        this.validMessageTitle = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangeDescription(value, isFirstTime: boolean = false) {
        
        this.validMessageDescription = ValidMessage.onSearchChangesCommon(value, 1000, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.backgroundEventFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
