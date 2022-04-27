import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxPopup, TabModel } from '@rx/view';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { GeneratorControllerDomain } from "app/components/generator-controller/domain/generator-controller.domain";
import { GeneratorControllerService } from "app/components/generator-controller/generator-controller.service";
import { GeneratorContext, GeneratorModels, GeneratorContextView,GeneratorController, vGeneratorModel, GeneratorContextLookup } from "app/generator-models";

@Component({
    templateUrl: './generator-controller.component.html',
    providers:[GeneratorControllerService]
})
export class GeneratorControllerComponent extends GeneratorControllerDomain implements OnInit, OnDestroy {
    contexts: GeneratorContext[];
    generatorModels : vGeneratorModel[];
    generatorViews : vGeneratorModel[];
    activeContext: GeneratorContext;
    showComponent: boolean = false;
    viewSubscription: Subscription;
    generatorControllerFormGroup: FormGroup;
    contextViewModels: Array<any> = new Array<any>();
    contextLookups: Array<any> = new Array<any>();
    constructor(
        private router: Router,
        private generatorControllerService:GeneratorControllerService,
        private formBuilder: FormBuilder
    ) { super();}
    ngOnInit(): void {       
        this.generatorControllerService.get().subscribe(generatorController => {
            this.contexts = generatorController.contexts;
            this.generatorModels = generatorController.generatorModels;
            this.generatorViews = generatorController.generatorViews;
            this.activeContext = this.contexts[0];
            this.initContextControllersViews(this.activeContext);
            this.showComponent = true;
        });
    }
    tabChanged(selectedContext:GeneratorContext,index:number) : void {
        this.activeContext = selectedContext;
        this.initContextControllersViews(this.activeContext);
    }
    itemAdded(tagModel: any) {
        let generatorContextViewData: GeneratorContextView = { generatorContextViewId: 0, generatorContextId: this.activeContext.generatorContextId, generatorModelId: tagModel.id };
        this.generatorControllerService.postView(generatorContextViewData).subscribe(generatorController => {
            var jObject:any = { modelId: tagModel.id, contextViewId: generatorController.generatorContextViewId };
            this.contextViewModels.push(jObject)
        });
    }

    itemRemoved(tagModel: any) {
        var findObject = this.contextViewModels.filter(t => t.modelId == tagModel.id)[0];
        if (findObject != undefined) {
            this.generatorControllerService.deleteView(findObject.contextViewId).subscribe(t => { });
            var indexOf = this.contextViewModels.indexOf(findObject);
            this.contextViewModels.splice(indexOf, 1);
        }
    }


    lookupAdded(tagModel: any,subController:any)
    {
        subController = subController.value;
        let generatorContextViewData: any = { generatorControllerId: subController.generatorControllerId, generatorModelId: tagModel.id };
        this.generatorControllerService.postLookup(generatorContextViewData).subscribe(generatorController => {
            var jObject: any = { generatorControllerId: subController.generatorControllerId, modelId: tagModel.id, contextLookupId: generatorController.generatorLookupId };
            this.contextLookups.push(jObject)
        });
    }

    lookupRemoved(tagModel: any,subController:any)
    {
        subController = subController.value;
        var findObject = this.contextLookups.filter(t => t.generatorControllerId== subController.generatorControllerId && t.modelId == tagModel.id)[0];
        if (findObject != undefined) {
            this.generatorControllerService.deleteLookup(findObject.contextLookupId).subscribe(t => { });
            var indexOf = this.contextLookups.indexOf(findObject);
            this.contextLookups.splice(indexOf, 1);
        }

    }

    onChangeViews(generatorModelId: number):void{
        
    }
    onChangeLookups(generatorModelId: number): void{
        
    }
    initContextControllersViews(generatorContext:GeneratorContext){
        // let generatorContextLookupData:string="";
        // for(var j = 0;j<generatorContext.generatorContextLookups.length;j++)
        // {
        //     generatorContextLookupData += String(generatorContext.generatorContextLookups[j].generatorModelId) + ","
        // }
        // generatorContextLookupData = generatorContextLookupData.slice(0, generatorContextLookupData.length - 1);
        let generatorContextViewData:string="";
        // for(var j = 0;j<generatorContext.generatorContextLookups.length;j++)
        // {
        //     generatorContextViewData += String(generatorContext.generatorContextLookups[j].generatorModelId) + ","
        // }
        //generatorContextViewData = generatorContextViewData.slice(0, generatorContextLookupData.length - 1);
        this.generatorControllerFormGroup =this.formBuilder.group({
            generatorControllers : this.formBuilder.array([]),
            generatorViews : [generatorContextViewData],
            //generatorLookups : [generatorContextLookupData]
        })
        this.generatorControllerFormGroup.get('generatorViews').valueChanges.subscribe(t => this.onChangeViews(t));
        //this.generatorControllerFormGroup.get('generatorLookups').valueChanges.subscribe(t => this.onChangeLookups(t));
        const control = <FormArray>this.generatorControllerFormGroup.controls['generatorControllers'];
        for(var  i = 0;i < generatorContext.generatorControllers.length;i++)
        {
            let generatorControllerId = generatorContext.generatorControllers[i].generatorControllerId == null ? "" : generatorContext.generatorControllers[i].generatorControllerId;
            let generatorContextId = generatorContext.generatorControllers[i].generatorContextId == null ? "" : generatorContext.generatorControllers[i].generatorContextId;
            let applicationModuleId = generatorContext.generatorControllers[i].applicationModuleId == null ? "" : generatorContext.generatorControllers[i].applicationModuleId;
            let moduleMasterName = generatorContext.generatorControllers[i].moduleMasterName == null ? "" : generatorContext.generatorControllers[i].moduleMasterName;
            let generatorModelId = generatorContext.generatorControllers[i].generatorModelId == null ? "" : generatorContext.generatorControllers[i].generatorModelId;
            let parentControllerId = generatorContext.generatorControllers[i].parentControllerId == null ? "" : generatorContext.generatorControllers[i].parentControllerId;
            let controllerDescription = generatorContext.generatorControllers[i].controllerDescription == null ? "" : generatorContext.generatorControllers[i].controllerDescription;
            let complexityType = generatorContext.generatorControllers[i].complexityType == null ? false : generatorContext.generatorControllers[i].complexityType;
            let isSearchController = generatorContext.generatorControllers[i].isSearchController == null ? false : generatorContext.generatorControllers[i].isSearchController;
            let isDataVerification = generatorContext.generatorControllers[i].isDataVerification == null ? false : generatorContext.generatorControllers[i].isDataVerification;
            control.push(this.formBuilder.group({
                generatorControllerId:[generatorControllerId,Validators.required],
                generatorContextId:[generatorContextId, Validators.required],
                applicationModuleId:[applicationModuleId, Validators.required],
                moduleMasterName:[moduleMasterName, Validators.required],
                generatorModelId:[generatorModelId],
                parentControllerId:[parentControllerId],
                controllerDescription:[controllerDescription],
                complexityType:[complexityType,Validators.required],
                isSearchController:[isSearchController],
                isDataVerification: [isDataVerification],
                lookupId:[]
            }))
        }
    }
    updateSubModules(generatorControllers:GeneratorController) : void { 
        this.generatorControllerService.put(generatorControllers).subscribe(generatorController => {

        });
    }
    ngOnDestroy(): void {
            if (this.viewSubscription)       
            this.viewSubscription.unsubscribe();
        super.destroy();
    }
}
