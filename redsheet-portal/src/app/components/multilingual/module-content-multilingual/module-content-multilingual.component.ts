import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, DialogClick, RxDialog, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ApplicationConfiguration } from "@rx/core"

import { ModuleContentMultilingualService } from './module-content-multilingual.service';
import { CommonLookups } from "app/lookups/CommonLookups";
//import { ModuleContentMultilingualLookupGroup, ModuleContentSearchViewModel, ModuleContentViewModel, ModuleContentModel } from "app/components/module-content-multilingual/domain/module-content-multilingual.models";
import { Language } from "app/database-models";
import { ModuleContentMultilingualDomain } from "app/components/multilingual/module-content-multilingual/domain/module-content-multilingual.domain";
import { ModuleContentMultilingualLookupGroup , ModuleContentSearchViewModel, ModuleContentViewModel, ModuleContentModel } from "app/components/multilingual/module-content-multilingual/domain/module-content-multilingual.models";

@Component({
    templateUrl: './module-content-multilingual.component.html'
})
export class ModuleContentMultilingualComponent extends ModuleContentMultilingualDomain implements OnInit, OnDestroy {
    languages: Language[];
    currentModuleContent: ModuleContentViewModel;
    moduleContents: ModuleContentViewModel[];
    selectedModuleContents: ModuleContentViewModel[];
    moduleContentSearchFormGroup: FormGroup;
    moduleContentMultilingualLookupGroup: ModuleContentMultilingualLookupGroup;
    showComponent: boolean = false;
    listSubscription: Subscription;
    languageHeaders = [];
    languageBody = [];
    selectedLanguages: any;
    isUpdate: boolean = true;
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private moduleContentMultilingualService: ModuleContentMultilingualService,
        private dialog: RxDialog,
    ) {
        super();
        this.selectedModuleContents = new Array<ModuleContentViewModel>();
    }
    itemRemoved(object: any): void {

        var findObject = this.selectedModuleContents.where(t => t.languageContentId == object.id)[0];
        if (findObject != undefined) {
            this.moduleContentMultilingualService.delete(findObject.moduleContentId).subscribe(t => {
                var indexOf = this.selectedModuleContents.indexOf(findObject);
                this.selectedModuleContents.splice(indexOf, 1);
            })
        }

    }

    itemAdded(object: any): void {
        var formObject = this.moduleContentSearchFormGroup.value;
        var moduleContent = {
            applicationModuleId: formObject.applicationModuleId,
            languageContentId: object.id,
            languageContentType: formObject.languageContentType,
            operationType: formObject.operationType,
            languageName: "English",
        }
        this.moduleContentMultilingualService.post(moduleContent).subscribe(t => {
            if (t.moduleContentId != 0) {
                var languageContentDetail = this.moduleContentMultilingualLookupGroup.languageContentNames.where(t => t.languageContentId == parseInt(object.id))[0]
                if (languageContentDetail != undefined) {
                    this.selectedModuleContents.push(new ModuleContentViewModel(
                        {
                            baseText: "",
                            moduleContentId: t.moduleContentId,
                            moduleText: "",
                            english: languageContentDetail.english,
                            languageContentId: String(languageContentDetail.languageContentId),
                            languageContentName: languageContentDetail.languageContentName,
                        }))
                }
            }
        })
    }

    ngOnInit(): void {
        this.moduleContentMultilingualService.lookup([
            CommonLookups.applicationModules, CommonLookups.dbOperationTypes, CommonLookups.recordStatuses, CommonLookups.languageContentTypes, CommonLookups.languageContentNames,
        ]).then((response: ModuleContentMultilingualLookupGroup) => {
            this.moduleContentMultilingualLookupGroup = new ModuleContentMultilingualLookupGroup();
            this.moduleContentMultilingualLookupGroup = response
            let moduleContentSearchForm: ModuleContentModel = new ModuleContentModel();
            this.moduleContentSearchFormGroup = this.validation.getFormGroup(moduleContentSearchForm);
            this.languages = ApplicationConfiguration.get("languages");
            this.languages = this.languages.where(t => t.active == true);
            this.showComponent = true;
        });
    }

    search(): void {
        this.moduleContentMultilingualService.searchModuleContents(this.moduleContentSearchFormGroup.value).subscribe(moduleContentSearchResult => {
            this.moduleContents = moduleContentSearchResult;
        }, error => {
            if (!error.status) {
            }
        })
    }

    focused(moduleContent: ModuleContentViewModel) {
        this.currentModuleContent = new ModuleContentViewModel();
        for (var col in moduleContent) {
            this.currentModuleContent[col] = moduleContent[col];
        }
    }

    tabChanged(): void {
        this.isUpdate = !this.isUpdate;
        this.selectedModuleContents = [];
        this.moduleContentSearchFormGroup.controls.languageContentId.setValue(0)
    }

    updateModuleContent(moduleContent: ModuleContentViewModel): void {
        if (this.currentModuleContent && this.currentModuleContent.moduleText != moduleContent.moduleText) {
            var translationText: any = {
                languageName: (this.isUpdate) ? this.moduleContentSearchFormGroup.value.languageName : "English",
                contentId: moduleContent.moduleContentId,
                value: moduleContent.moduleText
            };
            this.moduleContentMultilingualService.put(translationText).subscribe(t => { })
        }
    }

    resetSearchModuleContentMultilingual(): void {
        let moduleContentSearchForm: ModuleContentSearchViewModel = new ModuleContentSearchViewModel();
        moduleContentSearchForm.languageId = 1;
        this.moduleContentSearchFormGroup.reset(moduleContentSearchForm)
        this.selectedModuleContents = [];
        this.moduleContents = [];
        this.moduleContentSearchFormGroup.controls.languageContentId.setValue(0)
        //this.search();
    }
    deleteModuleContent(moduleContents): void {
        if (this.isUpdate) {
            this.dialog.confirmation([moduleContents.languageContentName], "delete").then(dialogClick => {
                if (dialogClick == DialogClick.PrimaryOk) {
                    this.listSubscription = this.moduleContentMultilingualService.delete(moduleContents.moduleContentId).subscribe(t => {
                        this.listSubscription.unsubscribe();
                        this.search();
                    });
                }
            });
        } else {
            this.itemRemoved({ id: moduleContents.languageContentId, text: moduleContents.languageContentName });
        }

    }
    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
