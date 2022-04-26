import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vEventAgendaTiming, EventAgendaTiming } from 'app/database-models';
import { EventAgendaTimingsService } from '../event-agenda-timings.service';
import { EventAgendaTimingDomain } from '../domain/event-agenda-timing.domain';

import { EventAgendaTimingAddComponent } from 'app/components/project-event-timeline/event-agenda-timings/add/event-agenda-timing-add.component';
import { EventAgendaTimingEditComponent } from 'app/components/project-event-timeline/event-agenda-timings/edit/event-agenda-timing-edit.component';

import { NEGOTIATION_PHASES } from 'app/database-collections/negotiation-phase'

@Component({
    selector: 'app-event-agenda-timing-list',
    templateUrl: './event-agenda-timing-list.component.html',
    entryComponents: [EventAgendaTimingAddComponent, EventAgendaTimingEditComponent,]
})
export class EventAgendaTimingListComponent extends EventAgendaTimingDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    eventAgendaTimings: vEventAgendaTiming[];
    currentEventAgendaTimings: vEventAgendaTiming[];
    listSubscription: Subscription;
    editSubscription: Subscription;
    negotiationPhases: any;
    isActive: boolean;
    deleteSubscription: Subscription;
    @Input() projectEventTimelineId: number;
    @Input() isLocked: boolean;
    currentEventAgendaTiming: any;
    previousEventAgendaTiming: any;
    nextEventAgendaTiming: any;
    sortOrder: number;
    countEventAgendaTimmings: number = 0;
    isAnyTabEmptyInEventManagementAndTimeline: boolean = false;

    constructor(
        private eventAgendaTimingsService: EventAgendaTimingsService,
        private dialog: RxDialog,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
    ) { super(); this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        
        this.sortOrder = -1;
        this.currentEventAgendaTiming = null;
        this.previousEventAgendaTiming = null;
        this.nextEventAgendaTiming = null;

        if (this.listSubscription)
            this.listSubscription.unsubscribe();

        this.negotiationPhases = NEGOTIATION_PHASES;

        for (let i = 0; i < this.negotiationPhases.length; i++) {
            if (i == 0)
                this.negotiationPhases[0]["isActive"] = true;
            else
                this.negotiationPhases[i]["isActive"] = false;
        }

        this.eventAgendaTimingsService.get(this.projectEventTimelineId).subscribe(eventAgendaTimings => {
            this.eventAgendaTimings = eventAgendaTimings;
            this.getData(NEGOTIATION_PHASES[0].negotiationPhaseId);

            this.showComponent = true;

            for (let index = 0; index < NEGOTIATION_PHASES.length; index++) {
                let eventAgendaTiming = this.eventAgendaTimings.find(c => c.negotiationPhaseId == NEGOTIATION_PHASES[index].negotiationPhaseId)

                if (!eventAgendaTiming) {
                    this.isAnyTabEmptyInEventManagementAndTimeline = true;
                    return false;
                }
                else {
                    this.isAnyTabEmptyInEventManagementAndTimeline = false;
                }
            }
        });
    }

    getData(negotiationPhaseId): void {
        
        this.currentEventAgendaTimings = this.eventAgendaTimings.where(a => a.negotiationPhaseId == negotiationPhaseId);
        this.countEventAgendaTimmings = this.currentEventAgendaTimings.count();
    }

    showEventAgendaTimingAddComponent(vEventAgendaTiming: vEventAgendaTiming): void {
        //var RowIndex = this.currentEventAgendaTimings.where(a=>a.negotiationPhaseId == NEGOTIATION_PHASES[0].negotiationPhaseId).length + 1;
        document.body.className = "modal-open";
        this.popup.show(EventAgendaTimingAddComponent, { projectEventTimelineId: this.projectEventTimelineId, eventAgendaTimingId: vEventAgendaTiming.eventAgendaTimingId }).then(t => this.ngOnInit());
    }

    showEventAgendaTimingEditComponent(vEventAgendaTiming: vEventAgendaTiming): void {
        document.body.className = "modal-open";
        this.popup.show(EventAgendaTimingEditComponent, { projectEventTimelineId: this.projectEventTimelineId, eventAgendaTimingId: vEventAgendaTiming.eventAgendaTimingId }).then(t => this.ngOnInit());
    }

    showEventAgendaTimingDeleteComponent(vEventAgendaTiming: vEventAgendaTiming): void {
        this.dialog.confirmation([vEventAgendaTiming.purpose], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.deleteSubscription = this.eventAgendaTimingsService.delete(this.projectEventTimelineId, vEventAgendaTiming.eventAgendaTimingId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }


    selectEvent(eventAgendaTimingIndex): void {
        this.sortOrder = eventAgendaTimingIndex;
        this.currentEventAgendaTiming = this.currentEventAgendaTimings.find(a => a.sortOrder == eventAgendaTimingIndex);
        this.previousEventAgendaTiming = this.currentEventAgendaTimings.find(a => a.sortOrder == eventAgendaTimingIndex - 1);
        this.nextEventAgendaTiming = this.currentEventAgendaTimings.find(a => a.sortOrder == eventAgendaTimingIndex + 1);
    }

    sortUp(templateEvent: any): void {
        if (this.previousEventAgendaTiming) {
            this.currentEventAgendaTiming.sortOrder--;
            this.previousEventAgendaTiming.sortOrder++;
            var eventAgendatiming = new EventAgendaTiming();
            eventAgendatiming = this.currentEventAgendaTiming;
            eventAgendatiming.previousEventAgendaTimingId = this.previousEventAgendaTiming.eventAgendaTimingId;
            //eventAgendatiming.previousEventAgendaTimingRowIndex = this.previousEventAgendaTiming.rowIndex;
            eventAgendatiming.previousEventAgendaTimingSortOrder = this.previousEventAgendaTiming.sortOrder;
            eventAgendatiming.previousEventAgendaTimingTime = this.previousEventAgendaTiming.time;

            this.editSubscription = this.eventAgendaTimingsService.put(this.projectEventTimelineId, eventAgendatiming).subscribe(t => {
                templateEvent.sort("sortOrder", true);
                this.sortOrder = this.previousEventAgendaTiming;
                this.currentEventAgendaTiming = null;
                this.previousEventAgendaTiming = null;
                this.nextEventAgendaTiming = null;
            },
                error => {
                })


        }

    }

    sortDown(templateEvent: any): void {
        if (this.nextEventAgendaTiming) {
            this.currentEventAgendaTiming.sortOrder++;
            this.nextEventAgendaTiming.sortOrder--;
            var eventAgendatiming = new EventAgendaTiming();
            eventAgendatiming = this.currentEventAgendaTiming;
            eventAgendatiming.previousEventAgendaTimingId = this.nextEventAgendaTiming.eventAgendaTimingId;
            eventAgendatiming.previousEventAgendaTimingSortOrder = this.nextEventAgendaTiming.sortOrder;
            eventAgendatiming.previousEventAgendaTimingTime = this.nextEventAgendaTiming.time;
            this.editSubscription = this.eventAgendaTimingsService.put(this.projectEventTimelineId, eventAgendatiming).subscribe(t => {
                //this.currentEventAgendaTimings.sort((a,b)=>b.rowIndex-a.rowIndex);
                templateEvent.sort("sortOrder", true);
                this.sortOrder = this.nextEventAgendaTiming;
                this.currentEventAgendaTiming = null;
                this.previousEventAgendaTiming = null;
                this.nextEventAgendaTiming = null;
            },
                error => {

                })
        }
    }

    getTabName(Name): string {
        return Name.negotiationPhaseName + '-tab';
    }

    getTabSelected(index, negotiationPhaseId): void {

        this.sortOrder = -1;
        this.currentEventAgendaTiming = null;
        this.previousEventAgendaTiming = null;
        this.nextEventAgendaTiming = null;
        this.getData(negotiationPhaseId);
        for (let i = 0; i < this.negotiationPhases.length; i++) {
            if (i == index)
                this.negotiationPhases[i].isActive = true;
            else
                this.negotiationPhases[i].isActive = false;
        }
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
