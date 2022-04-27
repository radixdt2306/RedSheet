import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vLiteTheirTeamMember } from 'app/database-models';
import { LiteTheirTeamMembersService } from '../lite-their-team-members.service';
import { LiteTheirTeamMemberDomain } from '../domain/lite-their-team-member.domain';

import { LiteTheirTeamMemberAddComponent } from 'app/components/lite-project-background/lite-their-team-members/add/lite-their-team-member-add.component';
import { LiteTheirTeamMemberEditComponent } from 'app/components/lite-project-background/lite-their-team-members/edit/lite-their-team-member-edit.component';

@Component({
    selector:'app-lite-their-team-member-list',
    templateUrl: './lite-their-team-member-list.component.html',
	entryComponents : [ LiteTheirTeamMemberAddComponent,LiteTheirTeamMemberEditComponent, ]
})
export class LiteTheirTeamMemberListComponent extends LiteTheirTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteTheirTeamMembers: vLiteTheirTeamMember[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
	@Input()  liteProjectBackgroundId :number;
    @Input() isLocked:boolean;
    constructor(
        private liteTheirTeamMembersService: LiteTheirTeamMembersService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.liteTheirTeamMembersService.get(this.liteProjectBackgroundId).subscribe(liteTheirTeamMembers => {
            this.liteTheirTeamMembers = liteTheirTeamMembers;
            this.showComponent = true;
        });
    }

	showLiteTheirTeamMemberEditComponent(vLiteTheirTeamMember: vLiteTheirTeamMember): void {
        document.body.className = "modal-open";
        this.popup.show(LiteTheirTeamMemberEditComponent, { liteProjectBackgroundId: this.liteProjectBackgroundId, liteTheirTeamMemberId: vLiteTheirTeamMember.liteTheirTeamMemberId }).then(t => this.ngOnInit());
    }
	showLiteTheirTeamMemberAddComponent(vLiteTheirTeamMember: vLiteTheirTeamMember): void {
        document.body.className = "modal-open";
        this.popup.show(LiteTheirTeamMemberAddComponent, { liteProjectBackgroundId: this.liteProjectBackgroundId, liteTheirTeamMemberId: vLiteTheirTeamMember.liteTheirTeamMemberId }).then(t => this.ngOnInit());
    }
    showLiteTheirTeamMemberDeleteComponent(vLiteTheirTeamMember: vLiteTheirTeamMember): void {
		this.dialog.confirmation([vLiteTheirTeamMember.liteTheirTeamMemberName], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.liteTheirTeamMembersService.delete(this.liteProjectBackgroundId,vLiteTheirTeamMember.liteTheirTeamMemberId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
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
