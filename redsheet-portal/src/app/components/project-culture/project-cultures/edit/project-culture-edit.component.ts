import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectCulture, vProjectCultureRecord, vCountry, Culture, vProjectModuleRecord, ProjectModule, } from 'app/database-models';

import { ProjectCultureLookups, } from 'app/lookups';
import { ProjectCulturesService } from '../project-cultures.service';
import { ProjectCultureDomain } from '../domain/project-culture.domain';
import { ProjectCultureLookupGroup } from '../domain/project-culture.models';

import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';
import { debounce } from 'rxjs/operator/debounce';
import { ProjectModulesService } from 'app/components/project-module/project-modules/project-modules.service';

import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, CULTURE_CONST } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './project-culture-edit.component.html',
    entryComponents: [ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectCultureEditComponent extends ProjectCultureDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectCultureFormGroup: FormGroup;
    editSubscription: Subscription;
    addSubscription: Subscription;
    projectCultureLookupGroup: ProjectCultureLookupGroup;
    projectCultureId: number;
    projectModuleId: number;
    validMessageNote: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectCulturesService: ProjectCulturesService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {

            this.projectCultureId = param['projectCultureId']
            this.projectModuleId = param['projectModuleId']
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        })
    }

    ngOnInit(): void {
        this.projectCulturesService.group([this.projectCultureId], [ProjectCultureLookups.countries, ProjectCultureLookups.cultureCountries,]).then(
            (response: ProjectCultureLookupGroup) => {
                this.projectCultureLookupGroup = response;
                this.projectCultureLookupGroup.projectCulture = new ProjectCulture(this.projectCultureLookupGroup.vProjectCultureRecord);
                //??
                if (this.projectCultureId == 0) {
                    var projectCulture = new ProjectCulture();
                    projectCulture.projectModuleId = this.projectModuleId;
                    projectCulture.note = "";
                    projectCulture.cultures = new Array<Culture>();
                    var ourCulture = new Culture();
                    ourCulture.countryId = -1;
                    ourCulture.isMonochronic = null;
                    ourCulture.isEgalitarian = null;
                    ourCulture.isIndividualistic = null;
                    ourCulture.isShortTerm = null;
                    ourCulture.cultureCategoryId = 85;
                    ourCulture.projectCultureId = 0;
                    projectCulture.cultures.push(ourCulture);
                    var theirCulture = new Culture();

                    theirCulture.countryId = -1;
                    theirCulture.isMonochronic = null;
                    theirCulture.isEgalitarian = null;
                    theirCulture.isIndividualistic = null;
                    theirCulture.isShortTerm = null;
                    theirCulture.cultureCategoryId = 86;
                    theirCulture.projectCultureId = 0;
                    projectCulture.cultures.push(theirCulture);
                    this.projectCultureFormGroup = this.validation.getFormGroup(projectCulture);
                } else {
                    this.projectCultureFormGroup = this.validation.getFormGroup(this.projectCultureLookupGroup.projectCulture);
                }
                this.validMessageNote = new ValidMessage();

                if (this.projectCultureFormGroup.controls.note.value == null)
                    this.projectCultureFormGroup.controls.note.setValue('');

                this.onSearchChangeNote(this.projectCultureFormGroup.controls.note.value,
                    this.projectCultureFormGroup.controls.note.value == '' ? true : false);
                this.showComponent = true;
            });
    }


    addProjectCulture(): void {
        this.projectCultureFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
        this.addSubscription = this.projectCulturesService.post(this.projectCultureFormGroup.value).subscribe(t => {
            this.router.navigate(["project-culture", this.projectModuleId, "project-cultures", t.projectCultureId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-culture/${this.projectModuleId}/project-cultures/${t.projectCultureId}`, filterText: CULTURE_CONST.value });
            this.projectCultureFormGroup.controls.projectCultureId.setValue(t.projectCultureId);
        },
            error => {
                //this.popup.validationFailed(error);
                this.toast.show(error, { status: 'error' })
            })
    }

    editProjectCulture(): void {
        if (this.projectCultureId == 0) {
            this.addProjectCulture()
        }
        else {
            this.editSubscription = this.projectCulturesService.put(this.projectCultureFormGroup.value).subscribe(t => {

            },
                error => {
                    //this.popup.validationFailed(error);
                    this.toast.show(error, { status: 'error' })
                })
        }
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    bindPrePopulateCulture(cultureGroup: FormGroup): void {
        let countryId = cultureGroup.value.countryId;
        let cultureCountry = this.projectCultureLookupGroup.cultureCountries.where(t => t.countryId == countryId)[0];
        if (cultureCountry) {
            var jObject: any = {}
            for (var column in cultureCountry) {
                if (cultureGroup.controls[column])
                    cultureGroup.controls[column].setValue(cultureCountry[column]);
            }
        }
    }

    onSearchChangeNote(value, isFirstTime: boolean = false) {
        
        this.validMessageNote = ValidMessage.onSearchChangesCommon(value, 500, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectCultureFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
