import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { NanoProjectNegotiable, vNanoProjectNegotiable, vNanoProjectNegotiableRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { NanoProjectNegotiablesService } from '../nano-project-negotiables.service';
import { NanoProjectNegotiableDomain } from '../domain/nano-project-negotiable.domain';
import { NanoProjectNegotiableLookupGroup } from '../domain/nano-project-negotiable.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './nano-project-negotiable-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class NanoProjectNegotiableEditComponent extends NanoProjectNegotiableDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoProjectNegotiableFormGroup: FormGroup;
    editSubscription: Subscription;
    nanoProjectNegotiableLookupGroup: NanoProjectNegotiableLookupGroup;;
    @Input() nanoProjectNegotiableId: number;
    @Input() projectModuleId: number;

    validMessageRequirement: ValidMessage;
    validMessageMdo: ValidMessage;
    validMessageLdo: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private nanoProjectNegotiablesService: NanoProjectNegotiablesService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.nanoProjectNegotiablesService.getBy(this.projectModuleId, [this.nanoProjectNegotiableId]).subscribe(
            (response: vNanoProjectNegotiableRecord) => {
                this.nanoProjectNegotiableLookupGroup = new NanoProjectNegotiableLookupGroup();
                this.nanoProjectNegotiableLookupGroup.nanoProjectNegotiable = new NanoProjectNegotiable(response);
                this.nanoProjectNegotiableFormGroup = this.validation.getFormGroup(this.nanoProjectNegotiableLookupGroup.nanoProjectNegotiable);

                this.validMessageRequirement = new ValidMessage();
                this.validMessageMdo = new ValidMessage();
                this.validMessageLdo = new ValidMessage();

                this.onSearchChangeRequirement(this.nanoProjectNegotiableFormGroup.controls.requirement.value,
                    this.nanoProjectNegotiableFormGroup.controls.requirement.value == '' ? true : false);
                this.onSearchChangeMdo(this.nanoProjectNegotiableFormGroup.controls.mdo.value,
                    this.nanoProjectNegotiableFormGroup.controls.mdo.value == '' ? true : false);
                this.onSearchChangeLdo(this.nanoProjectNegotiableFormGroup.controls.ldo.value,
                    this.nanoProjectNegotiableFormGroup.controls.ldo.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editNanoProjectNegotiable(): void {
        this.editSubscription = this.nanoProjectNegotiablesService.put(this.projectModuleId, this.nanoProjectNegotiableFormGroup.value).subscribe(t => {
            this.hideNanoProjectNegotiableEditComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideNanoProjectNegotiableEditComponent(): void {
        document.body.className = "";
        this.popup.hide(NanoProjectNegotiableEditComponent);
    }

    onSearchChangeRequirement(value, isFirstTime: boolean = false) {
        
        this.validMessageRequirement = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeMdo(value, isFirstTime: boolean = false) {
        
        this.validMessageMdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeLdo(value, isFirstTime: boolean = false) {
        
        this.validMessageLdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nanoProjectNegotiableFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}