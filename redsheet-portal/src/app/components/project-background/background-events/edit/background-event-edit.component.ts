import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { BackgroundEvent, vBackgroundEvent, vBackgroundEventRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { BackgroundEventsService } from '../background-events.service';
import { BackgroundEventDomain } from '../domain/background-event.domain';
import { BackgroundEventLookupGroup } from '../domain/background-event.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './background-event-edit.component.html',
    entryComponents: [RxMessageComponent]
})
export class BackgroundEventEditComponent extends BackgroundEventDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    backgroundEventFormGroup: FormGroup;
    editSubscription: Subscription;
    backgroundEventLookupGroup: BackgroundEventLookupGroup;;
    @Input() backgroundEventId: number;
    @Input() projectBackgroundId: number;
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
        this.backgroundEventsService.getBy(this.projectBackgroundId, [this.backgroundEventId]).subscribe(
            (response: vBackgroundEventRecord) => {
                if (!response.isEvent) {
                    response.endDate = null;
                }
                this.backgroundEventLookupGroup = new BackgroundEventLookupGroup();
                this.backgroundEventLookupGroup.backgroundEvent = new BackgroundEvent(response);
                this.backgroundEventFormGroup = this.validation.getFormGroup(this.backgroundEventLookupGroup.backgroundEvent);
                
                if (this.backgroundEventFormGroup.controls.title.value == null)
                    this.backgroundEventFormGroup.controls.title.setValue('');
                if (this.backgroundEventFormGroup.controls.description.value == null)
                    this.backgroundEventFormGroup.controls.description.setValue('');

                this.onSearchChangeTitle(this.backgroundEventFormGroup.controls.title.value, false);
                this.onSearchChangeDescription(this.backgroundEventFormGroup.controls.description.value, false);
                this.showComponent = true;
            });
    }

    editBackgroundEvent(): void {
        // if(this.backgroundEventFormGroup.controls.isEvent.value == true && this.backgroundEventFormGroup.controls.endDate.value == undefined)
        // {
        //     this.toast.show("Enter EndDate",{status: 'error'});
        // }
        // else
        // {
        //     this.editSubscription =  this.backgroundEventsService.put(this.projectBackgroundId,this.backgroundEventFormGroup.value).subscribe(t => {
        //     this.hideBackgroundEventEditComponent();
        // },
        //     error =>
        //     {
        //         this.popup.validationFailed(error);
        //         this.toast.show(error,{status: 'error'})
        //     })
        // }
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
                this.editSubscription = this.backgroundEventsService.put(this.projectBackgroundId, this.backgroundEventFormGroup.value).subscribe(t => {
                    this.hideBackgroundEventEditComponent();
                },
                    error => {
                        //this.popup.validationFailed(error);
                        this.toast.show(error, { status: 'error' })
                    })
            }
            else {
                this.toast.show("Start Date/End Date should be greater than today's date ", { status: "error" })
            }
        }
    }

    hideBackgroundEventEditComponent(): void {
        document.body.className = "";
        this.popup.hide(BackgroundEventEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
