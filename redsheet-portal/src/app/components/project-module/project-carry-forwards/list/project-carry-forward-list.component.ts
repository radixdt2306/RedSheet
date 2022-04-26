import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { vProjectCarryForward, ProjectCarryForward } from 'app/database-models';
import { ProjectCarryForwardsService } from '../project-carry-forwards.service';
import { ProjectCarryForwardDomain } from '../domain/project-carry-forward.domain';
import { ApplicationConfiguration } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    selector:'app-project-carry-forward-list',
    templateUrl: './project-carry-forward-list.component.html',
})
export class ProjectCarryForwardListComponent extends ProjectCarryForwardDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectCarryForwards: vProjectCarryForward[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    @Input()  projectModuleId :number;
    @Input()  projectCarryForwardId :number;
    @Input() isLocked:boolean;
    isAdd:boolean = false;
    editRowIndex: number;
    editCarryForward: vProjectCarryForward;
    addCarryForwardEntity:vProjectCarryForward;
    showSave: boolean = false;
    
    validMessageAddCarryForwardEntity: ValidMessage;
    validMessageCarryForwardEntity: ValidMessage;

    constructor(
        private projectCarryForwardsService: ProjectCarryForwardsService,    
        private dialog: RxDialog,
        private router: Router,
        private toast:RxToast,
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectCarryForwardsService.get(this.projectModuleId).subscribe(projectCarryForwards => {
            this.validMessageAddCarryForwardEntity = new ValidMessage();
            this.onSearchChangeAddCarryForwardEntity('', true);
            this.validMessageCarryForwardEntity = new ValidMessage();

            this.projectCarryForwards = projectCarryForwards;
            this.showComponent = true;
        });
    }

    showEditRecord(carryForward: vProjectCarryForward, rowIndex: number) {
        
        this.isAdd = false;
        this.editRowIndex = rowIndex;
        this.editCarryForward = new vProjectCarryForward(carryForward);
        this.showSave = true;
        this.onSearchChangeCarryForwardEntity(carryForward.carryForwardValue, false);
    }
  

    updateCarryForward(carryForward: ProjectCarryForward): void {
        if(carryForward.carryForwardValue.length > 0){
        if(carryForward && carryForward.carryForwardValue && carryForward.carryForwardValue.length <=400){
            if(carryForward.projectCarryForwardId != 0){
                
                    this.projectCarryForwardsService.put(this.projectCarryForwardId, carryForward).subscribe(t => {
                        this.projectCarryForwards[this.editRowIndex ].carryForwardValue = carryForward.carryForwardValue;
                        this.editRowIndex = null;
                        this.showSave = false;
                    }, error => {
                            this.toast.show(error.CarryForwardValue, {status: 'error'});
                    })
                 
                }
                else{
                this.projectCarryForwardsService.post(this.projectCarryForwardId, carryForward).subscribe(t => {
                    this.projectCarryForwards.push(this.addCarryForwardEntity);
                    this.projectCarryForwards[ this.projectCarryForwards.length-1].projectCarryForwardId = t.projectCarryForwardId;
                    this.isAdd = false;
                }, error => {
                    this.toast.show(error.CarryForwardValue, {status: 'error'});
                })
                this.editRowIndex = null;
                this.showSave = true;
                // this.saveFlag = true;
            }
        }else{
            var maxLength = ApplicationConfiguration.get("validation.message.default.maxlength");
            if(maxLength){
                maxLength = maxLength.replace("#n#",400)
                this.toast.show(maxLength,{status:'error'});
            }

        }
    }
    else
    {
        this.toast.show("Please enter details", {status:"error"});
    }
    }

    addCarryForward(rowIndex: number): void {
            this.addCarryForwardEntity = new ProjectCarryForward();
            this.addCarryForwardEntity.projectCarryForwardId =0;
            this.addCarryForwardEntity.carryForwardValue= "";
            this.addCarryForwardEntity.projectModuleId= this.projectModuleId;
            this.isAdd = true;
            // this.carryForwards.push(carryForward);
            // this.showEditRecord(carryForward,this.carryForwards.length-1);
    }
       
         
    // deleteCarryForward(carryForward: vProjectCarryForward, rowIndex: number){
    //     this.projectCarryForwardsService.delete(this.projectCarryForwardId,carryForward.projectCarryForwardId).subscribe(t => {
    //         this.projectCarryForwards.splice(rowIndex, 1)
    //     }, error => {
    //         this.toast.show(error, {status: 'error'});
    //     })
    // }

    showCarryForwardDeleteComponent(carryForward: vProjectCarryForward, rowIndex: number): void 
    {
        this.dialog.confirmation([carryForward.carryForwardValue], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) 
            {
                this.projectCarryForwardsService.delete(this.projectModuleId, carryForward.projectCarryForwardId).subscribe(t => {
                    this.projectCarryForwards.splice(rowIndex, 1)
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }
    
    onSearchChangeAddCarryForwardEntity(value, isFirstTime: boolean = false) {
        
        this.validMessageAddCarryForwardEntity = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    onSearchChangeCarryForwardEntity(value, isFirstTime: boolean = false) {
        
        this.validMessageCarryForwardEntity = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
