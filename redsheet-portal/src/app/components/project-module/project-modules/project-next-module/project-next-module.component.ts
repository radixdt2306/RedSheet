import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { ProjectModuleDomain } from '../domain/project-module.domain';
import { ProjectModulesService } from '../project-modules.service';
import { Project, ProjectModule } from 'app/database-models';
import { ProjectsService } from 'app/components/project/projects/projects.service';
import { ProjectLookupGroup } from 'app/components/project/projects/domain/project.models';


@Component({
    selector: 'app-project-next-module',
    templateUrl: './project-next-module.component.html',
})
export class ProjectNextModuleEditComponent extends ProjectModuleDomain implements OnInit, OnDestroy {
    projectModules: any;
    nextProjectModule: any
    showNextBtnComponent: boolean = false
    @Input() projectModuleId: number

    constructor(private projectService: ProjectsService, private projectModuleService: ProjectModulesService, private router: Router) {
        super();

    }

    ngOnInit(): void {
        
        this.projectModuleService.search(true, { projectModuleId: this.projectModuleId }).subscribe(t => {
            
            this.projectModules = t["projectModules"];
            let currentProjectModule = this.projectModules.find(p => p.projectModuleId == this.projectModuleId);
            this.nextProjectModule = this.projectModules.find(p => p.moduleOrder == (currentProjectModule.moduleOrder + 1));
            if (!this.nextProjectModule) {
                this.nextProjectModule = new ProjectModule();
                this.nextProjectModule.templateModuleName = "Back to My Projects";
                this.nextProjectModule.projectId = currentProjectModule.projectId;
            }
            this.showNextBtnComponent = true;
        })
    }

    redirectlink(projectModule) {
        
        if (projectModule.projectModuleId > 0)
            this.router.navigate([projectModule.uri]);
        else {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnDestroy(): void {
        super.destroy();
    }
}
