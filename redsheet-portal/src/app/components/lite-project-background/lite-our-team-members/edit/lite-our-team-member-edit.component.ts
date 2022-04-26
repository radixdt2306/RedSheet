import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteOurTeamMember, vLiteOurTeamMember, vLiteOurTeamMemberRecord, } from 'app/database-models';

import { LiteProjectBackgroundLookups, ProjectNegotionalityLookups, } from 'app/lookups';
import { LiteOurTeamMembersService } from '../lite-our-team-members.service';
import { LiteOurTeamMemberDomain } from '../domain/lite-our-team-member.domain';
import { LiteOurTeamMemberLookupGroup } from '../domain/lite-our-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';



@Component({
    templateUrl: './lite-our-team-member-edit.component.html',
    entryComponents: [RxMessageComponent]
})
export class LiteOurTeamMemberEditComponent extends LiteOurTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteOurTeamMemberFormGroup: FormGroup;
    editSubscription: Subscription;
    liteOurTeamMemberLookupGroup: any;
    manualEntered: boolean = true;
    @Input() liteOurTeamMemberId: number;
    @Input() liteProjectBackgroundId: number;
    // @Input()  userIds: any;
    personalityKey: string;
    description: string;
    liteOurTeamMemberName: any;

    validMessagePosition: ValidMessage;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteOurTeamMembersService: LiteOurTeamMembersService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        ;
        this.liteOurTeamMembersService.group(this.liteProjectBackgroundId, [this.liteOurTeamMemberId], [LiteProjectBackgroundLookups.personalities, ProjectNegotionalityLookups.userLookups,]).then(
            (response: LiteOurTeamMemberLookupGroup) => {
                this.liteOurTeamMemberLookupGroup = response;
                this.liteOurTeamMemberName = this.liteOurTeamMemberLookupGroup.userLookups;
                // for(let userId of this.userIds){
                //     let indexOf = -1;
                //     var removeLookups = [];
                //     this.liteOurTeamMemberLookupGroup.userLookups.forEach(t=>{
                //         if(t.userId != this.liteOurTeamMemberLookupGroup.vLiteOurTeamMemberRecord.userId)
                //         {
                //         var isFind = this.userIds.filter(userId => userId == t.userId)[0]
                //         if(isFind){
                //             removeLookups.push(t);
                //         }
                //     }
                //     })

                //     removeLookups.forEach(t=>{
                //         let indexOf = this.liteOurTeamMemberLookupGroup.userLookups.indexOf(t);
                //         this.liteOurTeamMemberLookupGroup.userLookups.splice(indexOf,1);
                //     })

                // }
                this.liteOurTeamMemberLookupGroup.liteOurTeamMember = new LiteOurTeamMember(this.liteOurTeamMemberLookupGroup.vLiteOurTeamMemberRecord);
                this.liteOurTeamMemberFormGroup = this.validation.getFormGroup(this.liteOurTeamMemberLookupGroup.liteOurTeamMember);
                this.checkPersonality(response.vLiteOurTeamMemberRecord.personalityId);

                this.validMessagePosition = new ValidMessage();

                this.onSearchChangePosition(this.liteOurTeamMemberFormGroup.controls.position.value,
                    this.liteOurTeamMemberFormGroup.controls.position.value == '' ? true : false);

                this.showComponent = true;
            });

    }

    editLiteOurTeamMember(): void {
        this.editSubscription = this.liteOurTeamMembersService.put(this.liteProjectBackgroundId, this.liteOurTeamMemberFormGroup.value).subscribe(t => {
            this.hideOurTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.liteOurTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.liteOurTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.liteOurTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideOurTeamMember(): void {
        document.body.className = "";
        this.popup.hide(LiteOurTeamMemberEditComponent);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteOurTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
