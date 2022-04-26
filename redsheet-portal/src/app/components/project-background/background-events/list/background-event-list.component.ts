import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vBackgroundEvent } from 'app/database-models';
import { BackgroundEventsService } from '../background-events.service';
import { BackgroundEventDomain } from '../domain/background-event.domain';

import { BackgroundEventEditComponent } from 'app/components/project-background/background-events/edit/background-event-edit.component';
import { BackgroundEventAddComponent } from 'app/components/project-background/background-events/add/background-event-add.component';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    selector: 'app-background-event-list',
    templateUrl: './background-event-list.component.html',
    entryComponents: [BackgroundEventEditComponent, BackgroundEventAddComponent,]
})
export class BackgroundEventListComponent extends BackgroundEventDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    backgroundEvents: vBackgroundEvent[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input() projectBackgroundId: number;
    @Input() isLocked: boolean;

    constructor(
        private backgroundEventsService: BackgroundEventsService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.backgroundEventsService.get(this.projectBackgroundId).subscribe(backgroundEvents => {
            this.backgroundEvents = backgroundEvents;
            this.showComponent = true;
        });
    }

    showBackgroundEventEditComponent(vBackgroundEvent: vBackgroundEvent): void {
        document.body.className = "modal-open";
        this.popup.show(BackgroundEventEditComponent, { projectBackgroundId: this.projectBackgroundId, backgroundEventId: vBackgroundEvent.backgroundEventId }).then(t => this.ngOnInit());
    }
    showBackgroundEventAddComponent(vBackgroundEvent: vBackgroundEvent): void {
        document.body.className = "modal-open";
        this.popup.show(BackgroundEventAddComponent, { projectBackgroundId: this.projectBackgroundId, backgroundEventId: vBackgroundEvent.backgroundEventId }).then(t => this.ngOnInit());
    }

    showBackgroundEventDeleteComponent(vBackgroundEvent: vBackgroundEvent): void {

        this.dialog.confirmation([vBackgroundEvent.title], "delete").then(dialogClick => {

            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.backgroundEventsService.delete(this.projectBackgroundId, vBackgroundEvent.backgroundEventId).subscribe(t => {
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
