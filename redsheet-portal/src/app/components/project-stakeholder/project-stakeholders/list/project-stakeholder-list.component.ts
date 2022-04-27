import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vProjectStakeholder } from 'app/database-models';
import { ProjectStakeholdersService } from '../project-stakeholders.service';
import { ProjectStakeholderDomain } from '../domain/project-stakeholder.domain';

import { ProjectStakeholderEditComponent } from 'app/components/project-stakeholder/project-stakeholders/edit/project-stakeholder-edit.component';
import { ProjectStakeholderAddComponent } from 'app/components/project-stakeholder/project-stakeholders/add/project-stakeholder-add.component';
import { ProjectModuleEditComponent } from 'app/components/project-module/project-modules/edit/project-module-edit.component';

import { HIDE_SIDE_BAR, SHOW_SIDE_BAR } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';
import { ProjectModuleStatic } from 'app/domain/project-module.static';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';


@Component({
    templateUrl: './project-stakeholder-list.component.html',
    entryComponents: [ProjectStakeholderEditComponent, ProjectStakeholderAddComponent, ProjectModuleEditComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectStakeholderListComponent extends ProjectStakeholderDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    isLocked: boolean = false;
    projectStakeholders: vProjectStakeholder[];
    listSubscription: Subscription;
    projectModuleId: number;
    deleteSubscription: Subscription;

    constructor(
        private projectStakeholdersService: ProjectStakeholdersService,
        private dialog: RxDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
        activatedRoute.params.subscribe((param: any) => {
            this.projectModuleId = param['projectModuleId'];
            ProjectModuleStatic.CurrentProjectModuleId = this.projectModuleId;
        });
        this.popup.setComponent(componentFactoryResolver);
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectStakeholdersService.get(this.projectModuleId).subscribe(projectStakeholders => {
            this.projectStakeholders = projectStakeholders;

            for (var j: number = 0; j < projectStakeholders.length; j++) {
                this.projectStakeholders[j]["communicationModeWithClass"] = [];
                this.projectStakeholders[j]["iconClass"] = [];
                for (var i: number = 0; i < projectStakeholders[j].communicationModeName.split(',').length; i++) {
                    this.projectStakeholders[j]["communicationModeWithClass"].push(projectStakeholders[j].communicationModeName.split(',')[i]);
                    this.projectStakeholders[j]["iconClass"].push(projectStakeholders[j].iconClassName.split(',')[i]);
                }
            }
            this.showComponent = true;
        });
    }

    showProjectStakeholderEditComponent(vProjectStakeholder: vProjectStakeholder): void {
        document.body.className = "modal-open";
        this.popup.show(ProjectStakeholderEditComponent, { projectStakeholderId: vProjectStakeholder.projectStakeholderId }).then(t => this.ngOnInit());
    }
    showProjectStakeholderAddComponent(vProjectStakeholder: vProjectStakeholder): void {
        document.body.className = "modal-open";
        this.popup.show(ProjectStakeholderAddComponent, { projectModuleId: this.projectModuleId, projectStakeholderId: vProjectStakeholder.projectStakeholderId }).then(t => this.ngOnInit());
    }
    showStakeholderDeleteComponent(vProjectStakeholder: vProjectStakeholder): void {

        this.dialog.confirmation([vProjectStakeholder.stakeholderName], "delete").then(dialogClick => {

            if (dialogClick == DialogClick.PrimaryOk) {

                this.deleteSubscription = this.projectStakeholdersService.delete(vProjectStakeholder.projectStakeholderId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    for (var key in error)
                        this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
                });
            }
        });
    }

    contentDisable(res) {
        this.isLocked = res;
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
