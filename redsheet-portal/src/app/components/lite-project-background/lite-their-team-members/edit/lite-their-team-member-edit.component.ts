import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteTheirTeamMember, vLiteTheirTeamMember, vLiteTheirTeamMemberRecord, } from 'app/database-models';

import { LiteProjectBackgroundLookups, } from 'app/lookups';
import { LiteTheirTeamMembersService } from '../lite-their-team-members.service';
import { LiteTheirTeamMemberDomain } from '../domain/lite-their-team-member.domain';
import { LiteTheirTeamMemberLookupGroup } from '../domain/lite-their-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-their-team-member-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class LiteTheirTeamMemberEditComponent extends LiteTheirTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteTheirTeamMemberFormGroup: FormGroup;
    editSubscription: Subscription;
    liteTheirTeamMemberLookupGroup: LiteTheirTeamMemberLookupGroup;;
    @Input() liteTheirTeamMemberId: number;
    @Input() liteProjectBackgroundId: number;
    personalityKey: string;
    description: string;

    validMessageLiteTheirTeamMemberName: ValidMessage;
    validMessagePosition: ValidMessage;


    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteTheirTeamMembersService: LiteTheirTeamMembersService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.liteTheirTeamMembersService.group(this.liteProjectBackgroundId, [this.liteTheirTeamMemberId], [LiteProjectBackgroundLookups.personalities,]).then(
            (response: LiteTheirTeamMemberLookupGroup) => {
                this.liteTheirTeamMemberLookupGroup = response;
                this.liteTheirTeamMemberLookupGroup.liteTheirTeamMember = new LiteTheirTeamMember(this.liteTheirTeamMemberLookupGroup.vLiteTheirTeamMemberRecord);
                this.liteTheirTeamMemberFormGroup = this.validation.getFormGroup(this.liteTheirTeamMemberLookupGroup.liteTheirTeamMember);
                this.checkPersonality(response.vLiteTheirTeamMemberRecord.personalityId);

                this.validMessageLiteTheirTeamMemberName = new ValidMessage();
                this.validMessagePosition = new ValidMessage();

                this.onSearchChangeLiteTheirTeamMemberName(this.liteTheirTeamMemberFormGroup.controls.liteTheirTeamMemberName.value,
                    this.liteTheirTeamMemberFormGroup.controls.liteTheirTeamMemberName.value == '' ? true : false);
                this.onSearchChangePosition(this.liteTheirTeamMemberFormGroup.controls.position.value,
                    this.liteTheirTeamMemberFormGroup.controls.position.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editLiteTheirTeamMember(): void {
        this.editSubscription = this.liteTheirTeamMembersService.put(this.liteProjectBackgroundId, this.liteTheirTeamMemberFormGroup.value).subscribe(t => {
            this.hideTheirTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.liteTheirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.liteTheirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.liteTheirTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideTheirTeamMember(): void {
        document.body.className = "";
        this.popup.hide(LiteTheirTeamMemberEditComponent);
    }

    onSearchChangeLiteTheirTeamMemberName(value, isFirstTime: boolean = false) {
        
        this.validMessageLiteTheirTeamMemberName = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) 
    {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteTheirTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}