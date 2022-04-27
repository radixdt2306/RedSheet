import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { Role, RolePermission, vRole } from "app/database-models";
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class RolesService {
    //private api: string = 'api/Roles'
    //private apiRolePermission: string = 'api/rolePermissions'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/Roles`,
            applicationModuleId: 23,
            keyName: 'roleId'
        }
        return authorizeApi;
    }
    private get apiRolePermission(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/rolePermissions`,
            applicationModuleId: 23,
            keyName: 'roleId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<vRole[]> {
        return this.http.get<vRole[]>(this.api);
    }
    post(role: Role): Observable<Role[]> {
        return this.http.post<Role[]>(this.api, role);
    }
    put(role: Role): Observable<Role[]> {
        return this.http.put<Role[]>(this.api, role);
    }
    delete(id: number): Observable<Role[]> {
        return this.http.delete<Role[]>(this.api, id);
    }
    getByRolePermission(params?: any[] | { [key: string]: any; } | RequestQueryParams): Observable<RolePermission[]> {
        return this.http.get<RolePermission[]>(this.apiRolePermission, params);
    }
    lookup<RolesLookupGroup>(lookupActions: LookupAction[]): Promise<RolesLookupGroup> {
        return this.http.lookup<RolesLookupGroup>(lookupActions);
    }
    group<RolesLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<RolesLookupGroup> {
        return this.http.group<RolesLookupGroup>(this.api, params, 'roles', lookupActions);
    }
    putRolePermission(rolePermission: RolePermission): Observable<RolePermission[]> {
        return this.http.put<RolePermission[]>(this.apiRolePermission, rolePermission);
    }
    postRolePermission(rolePermission: RolePermission): Observable<RolePermission[]> {
        return this.http.post<RolePermission[]>(this.apiRolePermission, rolePermission);
    }
}
