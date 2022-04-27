import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { TheirTeamMember, vTheirTeamMember, vTheirTeamMemberRecord, } from 'app/database-models';

import { ProjectNegotiationLookups, } from 'app/lookups';
import { TheirTeamMembersService } from '../their-team-members.service';
import { TheirTeamMemberDomain } from '../domain/their-team-member.domain';
import { TheirTeamMemberLookupGroup } from '../domain/their-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';



@Component({
    templateUrl: './their-team-member-edit.component.html',
    entryComponents: [RxMessageComponent]
})
export class TheirTeamMemberEditComponent extends TheirTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    theirTeamMemberFormGroup: FormGroup;
    editSubscription: Subscription;
    theirTeamMemberLookupGroup: TheirTeamMemberLookupGroup;
    personalityKey: string;
    description: string;
    @Input() theirTeamMemberId: number;
    @Input() projectNegotiationId: number;

    validMessageTheirTeamMemberName: ValidMessage;
    validMessagePosition: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private theirTeamMembersService: TheirTeamMembersService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.theirTeamMembersService.group(this.projectNegotiationId, [this.theirTeamMemberId], [ProjectNegotiationLookups.personalities,]).then(
            (response: TheirTeamMemberLookupGroup) => {
                this.theirTeamMemberLookupGroup = response;
                this.theirTeamMemberLookupGroup.theirTeamMember = new TheirTeamMember(this.theirTeamMemberLookupGroup.vTheirTeamMemberRecord);
                this.theirTeamMemberFormGroup = this.validation.getFormGroup(this.theirTeamMemberLookupGroup.theirTeamMember);
                this.checkPersonality(response.vTheirTeamMemberRecord.personalityId);

                this.validMessageTheirTeamMemberName = new ValidMessage();
                this.validMessagePosition = new ValidMessage();

                this.onSearchChangeTheirTeamMemberName(this.theirTeamMemberFormGroup.controls.theirTeamMemberName.value,
                    this.theirTeamMemberFormGroup.controls.theirTeamMemberName.value == '' ? true : false);
                this.onSearchChangePosition(this.theirTeamMemberFormGroup.controls.position.value,
                    this.theirTeamMemberFormGroup.controls.position.value == '' ? true : false);
                this.showComponent = true;
            });
    }


    editTheirTeamMember(): void {
        this.editSubscription = this.theirTeamMembersService.put(this.projectNegotiationId, this.theirTeamMemberFormGroup.value).subscribe(t => {
            this.hideTheirTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.theirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.theirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.theirTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideTheirTeamMember(): void {
        document.body.className = "";
        this.popup.hide(TheirTeamMemberEditComponent);
    }

    onSearchChangeTheirTeamMemberName(value, isFirstTime: boolean = false) {
        
        this.validMessageTheirTeamMemberName = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.theirTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
