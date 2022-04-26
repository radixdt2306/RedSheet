import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vNanoOurObjective, NanoOurObjective } from 'app/database-models';
import { NanoOurObjectivesService } from '../nano-our-objectives.service';
import { NanoOurObjectiveDomain } from '../domain/nano-our-objective.domain';
import { ApplicationConfiguration } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-nano-our-objective-list',
    templateUrl: './nano-our-objective-list.component.html',
})
export class NanoOurObjectiveListComponent extends NanoOurObjectiveDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoOurObjectives: vNanoOurObjective[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    isAdd:boolean = false;
    editRowIndex: number;
    editNanoOurObjective: vNanoOurObjective;
    addNanoOurObjectiveEntity:vNanoOurObjective;
    showSave: boolean = false;
	@Input()  nanoScopeToNegotiateObjectiveId :number;
    @Input() isLocked:boolean;
    validMessageAddObjectiveDetails: ValidMessage;
    validMessageObjectiveDetails: ValidMessage;
    constructor(
        private nanoOurObjectivesService: NanoOurObjectivesService,    
        private dialog: RxDialog,
        private router: Router,
        private toast: RxToast,
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.nanoOurObjectivesService.get(this.nanoScopeToNegotiateObjectiveId).subscribe(nanoOurObjectives => {
            this.nanoOurObjectives = nanoOurObjectives;
            this.validMessageAddObjectiveDetails = new ValidMessage();
            this.onSearchChangeAddObjectiveDetails('', true);
            this.validMessageObjectiveDetails= new ValidMessage();
            this.showComponent = true;
        });
    }

    showEditRecord(nanoOurObjective: vNanoOurObjective, rowIndex: number) {
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editNanoOurObjective = new vNanoOurObjective(nanoOurObjective);
        this.showSave = true;
        this.onSearchChangeObjectiveDetails(nanoOurObjective.nanoOurObjectiveValue, false);
    }
  

    updateNanoOurObjective(nanoOurObjective: NanoOurObjective): void {
        if (nanoOurObjective.nanoOurObjectiveValue.length > 0) {
            if (nanoOurObjective && nanoOurObjective.nanoOurObjectiveValue && nanoOurObjective.nanoOurObjectiveValue.length <= 150) {
                if (nanoOurObjective.nanoOurObjectiveId != 0) {

                    this.nanoOurObjectivesService.put(this.nanoScopeToNegotiateObjectiveId, nanoOurObjective).subscribe(t => {
                        this.nanoOurObjectives[this.editRowIndex].nanoOurObjectiveValue = nanoOurObjective.nanoOurObjectiveValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                         this.toast.show(error.NanoOurObjectiveValue, {status: 'error'});
                    })
                }
                else {
                    this.nanoOurObjectivesService.post(this.nanoScopeToNegotiateObjectiveId, nanoOurObjective).subscribe(t => {
                        this.nanoOurObjectives.push(this.addNanoOurObjectiveEntity);
                        this.nanoOurObjectives[this.nanoOurObjectives.length - 1].nanoOurObjectiveId = t.nanoOurObjectiveId;
                        this.isAdd = false;
                    }, error => {
                        this.toast.show(error.NanoOurObjectiveValue, { status: 'error' });
                    })
                    this.editRowIndex = null;
                    this.showSave = true;
                }
            } else {
                var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
                if (maxLength) {
                    maxLength = maxLength.replace("#n#", 150)
                    this.toast.show(maxLength, { status: 'error' });
                }

            }
        }
        else {
            this.toast.show("Please enter details", { status: "error" });
        }
    }

    addNanoOurObjective(rowIndex: number): void {
            this.addNanoOurObjectiveEntity = new NanoOurObjective();
            this.addNanoOurObjectiveEntity.nanoOurObjectiveId =0;
            this.addNanoOurObjectiveEntity.nanoOurObjectiveValue= "";
            this.addNanoOurObjectiveEntity.nanoScopeToNegotiateObjectiveId = this.nanoScopeToNegotiateObjectiveId;
            this.isAdd = true;
    }
       
         


    showNanoOurObjectiveDeleteComponent(nanoOurObjective: vNanoOurObjective, rowIndex: number): void 
    {
        this.dialog.confirmation([nanoOurObjective.nanoOurObjectiveValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.nanoOurObjectivesService.delete(this.nanoScopeToNegotiateObjectiveId, nanoOurObjective.nanoOurObjectiveId).subscribe(t => {
                    this.nanoOurObjectives.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    onSearchChangeAddObjectiveDetails(value, isFirstTime: boolean = false) {
        
        this.validMessageAddObjectiveDetails = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }
    onSearchChangeObjectiveDetails(value, isFirstTime: boolean = false){
        
        this.validMessageObjectiveDetails = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }
    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
