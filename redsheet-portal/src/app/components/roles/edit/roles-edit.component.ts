import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { vApplicationModuleMaster, ModuleMaster, RolePermission, Role } from "app/database-models";
import { CommonLookups } from "app/lookups/CommonLookups";
import { RolesDomain } from "app/components/roles/domain/roles.domain";
import { RolesService } from "app/components/roles/roles.service";
import { RolesLookupGroup, ApplicationModuleRolePermission } from "app/components/roles/domain/roles.models";
import { ApplicationModule } from "app/models";

@Component({
    templateUrl: './roles-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class RolesEditComponent extends RolesDomain implements OnInit, OnDestroy {
    rolePermissions: RolePermission[];
    rolesLookupGroup: RolesLookupGroup;
    showComponent: boolean = false;
    listSubscription: Subscription;
    mainModuleList: ModuleMaster[];
    otherModuleList: ApplicationModule[];
    allModuleList: ModuleMaster[];
    applicationModuleMasters: vApplicationModuleMaster[];
    selectedParentModuleId: number = undefined;
    selectedSubModuleId: number = undefined;
    selectedChildModuleId: number = undefined;
    subModuleList: any = [];
    childModuleList: any = [];
    roleId: number;
    roleEditFormGroup: FormGroup
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private rolesService: RolesService,
        private activatedRoute: ActivatedRoute,
    ) {
        super();
        this.validationFailed = {};
        activatedRoute.params.subscribe((param: any) => this.roleId = param['roleId']);
    }
    ngOnInit(): void {
        this.validationFailed = {};
        this.rolesService.group([this.roleId], [CommonLookups.applicationModuleMasters, CommonLookups.applicationModules, CommonLookups.mainModuleMasters]).then((response: RolesLookupGroup) => {
            this.rolesLookupGroup = new RolesLookupGroup();
            this.rolesLookupGroup = response;
            let roleData = new Role(this.rolesLookupGroup.roles);
            this.roleEditFormGroup = this.validation.getFormGroup(roleData);
            this.mainModuleList = this.rolesLookupGroup.mainModuleMasters.filter(function (m) { return m.isRolePermissionItem != false });
            this.otherModuleList = this.rolesLookupGroup.applicationModules;
            this.rolesService.getByRolePermission([this.roleId]).subscribe(rolePermissionList => {
                this.rolePermissions = rolePermissionList;
                this.selectedParentModuleId = this.selectedParentModuleId == undefined ? this.mainModuleList[0].moduleMasterId : this.selectedParentModuleId;
                this.bindSubModules(this.selectedParentModuleId);
                this.showComponent = true;
            });
        });
    }
    bindSubModules(moduleMasterId: number): void {
        this.subModuleList = [];
        this.selectedParentModuleId = moduleMasterId;
        let selectedModule: any = this.rolesLookupGroup.applicationModuleMasters.where(m => m.moduleMasterId == this.selectedParentModuleId).firstOrDefault()
        if (selectedModule != undefined) {
            this.bindChildModules(selectedModule.applicationModuleId);
        }
    }
    bindChildModules(applicationModuleId: number): void {
        let subModules: ApplicationModule[] = this.rolesLookupGroup.applicationModules.filter(function (m) { return m.parentApplicationModuleId == applicationModuleId && m.isRolePermissionItem == true });
        if (subModules != undefined && subModules.length > 0) {
            for (var i = 0; i < subModules.length; i++) {
                let rolePermission = this.rolePermissions.filter(function (m) { return m.applicationModuleId == subModules[i].applicationModuleId }).firstOrDefault();
                let rolePemissionNew: any = new ApplicationModuleRolePermission();
                if (rolePermission == undefined) {
                    rolePemissionNew.applicationModuleId = subModules[i].applicationModuleId;
                    rolePemissionNew.roleId = this.roleId;
                    rolePemissionNew.canAdd = false;
                    rolePemissionNew.canView = false;
                    rolePemissionNew.canEdit = false;
                    rolePemissionNew.canDelete = false;
                    rolePemissionNew.applicationModuleName = subModules[i].applicationModuleName;
                    rolePemissionNew.visibleActionItem = subModules[i].visibleActionItem;
                    rolePemissionNew.rolePermissionId = 0;
                }
                else {
                    rolePemissionNew = rolePermission;
                    rolePemissionNew['applicationModuleName'] = subModules[i].applicationModuleName;
                    rolePemissionNew['visibleActionItem'] = subModules[i].visibleActionItem;
                }
                var subModuleLength = this.subModuleList.length;
                rolePemissionNew['id'] = subModuleLength + 1;
                this.subModuleList.push(rolePemissionNew)
                this.bindChildModules(subModules[i].applicationModuleId);
            }
        }
    }
    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
    saveRolePermissionItem(applicationModuleRolePermission: ApplicationModuleRolePermission): void{
          let rolePermission: RolePermission = new RolePermission();
          rolePermission.canAdd = applicationModuleRolePermission.canAdd;
          rolePermission.canEdit = applicationModuleRolePermission.canEdit;
          rolePermission.canView = applicationModuleRolePermission.canView;
          rolePermission.canDelete = applicationModuleRolePermission.canDelete;
          rolePermission.roleId = applicationModuleRolePermission.roleId;
          rolePermission.applicationModuleId = applicationModuleRolePermission.applicationModuleId;
          rolePermission.rolePermissionId = applicationModuleRolePermission.rolePermissionId;
          if (rolePermission.rolePermissionId == 0) {
              this.addRolePermission(rolePermission);
          }
          else {
              this.updateRolePermission(rolePermission);
          }
    }
    saveRolePermission(applicationModuleRolePermission: ApplicationModuleRolePermission): void {
        this.saveRolePermissionItem(applicationModuleRolePermission)
    }
    addRolePermission(rolePermission: RolePermission): void {
        this.listSubscription = this.rolesService.postRolePermission(rolePermission).subscribe(t => {
            setTimeout(() => {
                this.listSubscription.unsubscribe();
                this.ngOnInit();
            },500)
        }, error => {
            this.ngOnInit();
            this.toast.show(error, { status: 'error' });
        });
    }
    updateRolePermission(rolePermission: RolePermission): void {
        this.listSubscription = this.rolesService.putRolePermission(rolePermission).subscribe(t => {
            setTimeout(() => {
                this.listSubscription.unsubscribe();
                this.ngOnInit();
            },500)
        }, error => {
            this.ngOnInit();
            this.toast.show(error, { status: 'error' });
        });
    }
    saveRoles(): void {
        if (this.roleEditFormGroup.value.roleName != undefined && this.roleEditFormGroup.value.roleName != "") {
            this.listSubscription = this.rolesService.put(this.roleEditFormGroup.value).subscribe(t => {
                this.listSubscription.unsubscribe();
                this.ngOnInit();
            }, error => {
                if (!error.status) {
                    this.validationFailed = error;
                    this.toast.show(error, { status: 'error' });
                }
            });
        }
    }
}
