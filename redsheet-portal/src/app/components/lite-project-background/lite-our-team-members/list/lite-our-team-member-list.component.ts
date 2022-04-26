import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vLiteOurTeamMember } from 'app/database-models';
import { LiteOurTeamMembersService } from '../lite-our-team-members.service';
import { LiteOurTeamMemberDomain } from '../domain/lite-our-team-member.domain';

import { LiteOurTeamMemberEditComponent } from 'app/components/lite-project-background/lite-our-team-members/edit/lite-our-team-member-edit.component';
import { LiteOurTeamMemberAddComponent } from 'app/components/lite-project-background/lite-our-team-members/add/lite-our-team-member-add.component';
import { ProjectNegotionalityLookups } from 'app/lookups';

@Component({
    selector: 'app-lite-our-team-member-list',
    templateUrl: './lite-our-team-member-list.component.html',
    entryComponents: [LiteOurTeamMemberEditComponent, LiteOurTeamMemberAddComponent,]
})
export class LiteOurTeamMemberListComponent extends LiteOurTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    addDisable: boolean = true;
    liteOurTeamMembers: vLiteOurTeamMember[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    userIds: number[];
    @Input() liteProjectBackgroundId: number;
    @Input() isLocked: boolean;
    constructor(
        private liteOurTeamMembersService: LiteOurTeamMembersService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {

        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteOurTeamMembersService.get(this.liteProjectBackgroundId).subscribe(liteOurTeamMembers => {

            this.liteOurTeamMembersService.lookup([ProjectNegotionalityLookups.userLookups]).then((response: any) => {
                let users = response;
                this.liteOurTeamMembers = liteOurTeamMembers;
                //  if(this.liteOurTeamMembers.length == users.userLookups.length)
                //  {
                //     this.addDisable = false;
                //  }
                this.showComponent = true;
            });
            // this.liteOurTeamMembers = liteOurTeamMembers;
            // this.showComponent = true;
        });
    }

    showLiteOurTeamMemberEditComponent(vLiteOurTeamMember: vLiteOurTeamMember): void {
        ;
        this.userIds = [];
        // this.liteOurTeamMembers.forEach(t=>{this.userIds.push(t.userId)});
        document.body.className = "modal-open";
        this.popup.show(LiteOurTeamMemberEditComponent, { liteProjectBackgroundId: this.liteProjectBackgroundId, liteOurTeamMemberId: vLiteOurTeamMember.liteOurTeamMemberId }).then(t => this.ngOnInit());
    }
    showLiteOurTeamMemberAddComponent(vLiteOurTeamMember: vLiteOurTeamMember): void {
        this.userIds = [];
        // this.liteOurTeamMembers.forEach(t=>{this.userIds.push(t.userId)});
        document.body.className = "modal-open";
        this.popup.show(LiteOurTeamMemberAddComponent, { liteProjectBackgroundId: this.liteProjectBackgroundId, liteOurTeamMemberId: vLiteOurTeamMember.liteOurTeamMemberId }).then(t => this.ngOnInit());
    }
    showLiteOurTeamMemberDeleteComponent(vLiteOurTeamMember: vLiteOurTeamMember): void {
        this.dialog.confirmation([vLiteOurTeamMember.liteOurTeamMemberName], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.deleteSubscription = this.liteOurTeamMembersService.delete(this.liteProjectBackgroundId, vLiteOurTeamMember.liteOurTeamMemberId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.addDisable = true;
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
