import { Component, OnInit, OnDestroy ,Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import {RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  OurTeamMember, OurTeamMemberBehaviour, OurTeamMemberRequire, vUserLookup, } from 'app/database-models';

import { ProjectNegotionalityLookups, } from 'app/lookups';
import { OurTeamMembersService } from '../our-team-members.service';
import { OurTeamMemberDomain } from '../domain/our-team-member.domain';
import { OurTeamMemberLookupGroup } from '../domain/our-team-member.models';
import { BEHAVIOURS, ASSERTIVENESS_BEHAVIOURS, CONFLICT_STYLE_BEHVIOURS } from 'app/database-collections';
import { TagModel } from "@rx/forms";
import { debounce } from 'rxjs/operator/debounce';


@Component({
    templateUrl: './our-team-member-add.component.html',
    entryComponents : [RxMessageComponent]
})
export class OurTeamMemberAddComponent extends OurTeamMemberDomain implements OnInit, OnDestroy, ComponentCanDeactivate  {
    showComponent:boolean = false;
    ourTeamMemberFormGroup: FormGroup;
    addSubscription: Subscription;    
    ourTeamMemberLookupGroup: any;
    @Input()  projectNegotionalityId :number;
    @Input()  userIds: any;
    private behaviours:any;
    private assertivenessBehaviours:any;
    private conflictStyleBehaviours:any;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private ourTeamMembersService: OurTeamMembersService,    
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        
        this.ourTeamMembersService.lookup([ ProjectNegotionalityLookups.teamRoles,ProjectNegotionalityLookups.userLookups]).then(            
            (response: any ) => {
                this.ourTeamMemberLookupGroup = response;
                for(let userId of this.userIds){
                    let indexOf = -1;
                    var removeLookups = [];
                    this.ourTeamMemberLookupGroup.userLookups.forEach(t=>{
                        var isFind = this.userIds.filter(userId => userId == t.userId)[0]
                        if(isFind){
                            removeLookups.push(t);
                        }
                    })

                    removeLookups.forEach(t=>{
                        let indexOf = this.ourTeamMemberLookupGroup.userLookups.indexOf(t);
                        this.ourTeamMemberLookupGroup.userLookups.splice(indexOf,1);
                    })

                }

                this.ourTeamMemberLookupGroup.teamRoles = response.teamRoles;
                this.ourTeamMemberLookupGroup.ourTeamMember = new OurTeamMember();                 
                let ourTeamMember:OurTeamMember = new OurTeamMember();
                ourTeamMember.ourTeamMemberId = 0;
                ourTeamMember.ourTeamMemberRequires = new Array<OurTeamMemberRequire>();
                ourTeamMember.ourTeamMemberBehaviours = new Array<OurTeamMemberBehaviour>();
                let ourTeamMemberBehaviour:OurTeamMemberBehaviour = new OurTeamMemberBehaviour();
                let i = -1;
                    ourTeamMemberBehaviour.agreeableId = i;
                    ourTeamMemberBehaviour.assertivenessId = i;
                    ourTeamMemberBehaviour.conflictStyleId = i;
                    ourTeamMemberBehaviour.consciousnessId = i;
                    ourTeamMemberBehaviour.emotionalCompetenceId = i;
                    ourTeamMemberBehaviour.openMindedId = i;
                    ourTeamMemberBehaviour.outingId = i;
                    ourTeamMemberBehaviour.personalCalmId = i;
                    ourTeamMemberBehaviour.solutionFocusedId = i;
                    ourTeamMemberBehaviour.wIllToWinId = i;
                    ourTeamMemberBehaviour.ourTeamMemberId = 0;
                    ourTeamMember.ourTeamMemberBehaviours.push(ourTeamMemberBehaviour);
                ourTeamMember.projectNegotionalityId = this.projectNegotionalityId;
                ourTeamMember.teamRoleId = -1;
                ourTeamMember.userId = -1;
                this.ourTeamMemberFormGroup = this.validation.getFormGroup(ourTeamMember);
                 this.behaviours = BEHAVIOURS;
                 this.assertivenessBehaviours = ASSERTIVENESS_BEHAVIOURS;
                 this.conflictStyleBehaviours = CONFLICT_STYLE_BEHVIOURS;

                 //console.log(this.ourTeamMemberFormGroup);
                this.showComponent = true;
            });
    }

     addOurTeamMember(): void {
        this.addSubscription =  this.ourTeamMembersService.post(this.projectNegotionalityId,this.ourTeamMemberFormGroup.value).subscribe(t => {
        this.hideOurTeamMember();
        },
        error => {
            //this.popup.validationFailed(error);            
            this.toast.show(error,{status: 'error'})
        })
     }


    hideOurTeamMember(): void {
        document.body.className = "";
        this.popup.hide(OurTeamMemberAddComponent);
    }

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.ourTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
