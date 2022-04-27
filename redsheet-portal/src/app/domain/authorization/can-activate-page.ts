import { Injectable, Inject, ReflectiveInjector } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { Http, RequestOptions, Headers } from "@angular/http";

import { Subscription } from 'rxjs/Rx';

import { API_HOST_URI, RequestHeaders, ResponseResult } from "@rx/http";
import "@rx/linq";
import { ApplicationConfiguration, ApplicationBroadcaster, ApplicationPage } from "@rx/core";
import { user, UserPermissionCache } from "@rx/security";
import { RxStorage } from "@rx/storage";

import { UserAuthorizationService } from './user-authorization.service';
import { ApplicationService } from './app.service';

import { Notification } from '../notification-broadcaster'
@Injectable()
export class CanActivatePage implements CanActivate {
    minutes: number = 1;
    private api: string = 'api/userauthorization'
    storage: RxStorage;
    configurationSubscription: Subscription;
    constructor(
        private userAuthorizationService: UserAuthorizationService,
        private router: Router,
        private applicationBroadcaster: ApplicationBroadcaster) {
        if (!ApplicationConfiguration.isDataExits()) {
            this.configurationSubscription = this.applicationBroadcaster.configurationSubscriber.subscribe(t => {
                this.minutes = ApplicationConfiguration.get("authorization").cacheMinutes;
                this.configurationSubscription.unsubscribe();
            });
        } else {
            this.minutes = ApplicationConfiguration.get("authorization").cacheMinutes;
        }
        let injector: any = ReflectiveInjector.resolveAndCreate([RxStorage]);
        this.storage = injector.get(RxStorage);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        Notification.broadcast();
        var auth = this.storage.local.get('auth');
        let id = 0;
        let applicationModuleId = route.data["applicationModuleId"];
        if (route.data["applicationModuleId"] && !route.data["childModuleName"]) {
            ApplicationPage.Init();
            ApplicationPage.addOrUpdateObject('applicationModuleId', route.data["applicationModuleId"]);
        }
        if ((applicationModuleId == 33 || applicationModuleId == 1037 || applicationModuleId == 5103 || applicationModuleId == 5132) && !auth) //For Forgot Password and Login Bypass Ishani
            return true;
        else if ((applicationModuleId == 33 || applicationModuleId == 1037) && auth)  //For Forgot Password and Login Bypass Ishani
            this.router.navigate(['dashboard']);
        else if (applicationModuleId == 5104 && auth)  //For Forgot Password and Login Bypass Ishani
            return true;
        let isAppAuthorized = user.isApplicationAuthorized();
        let accessItem = route.data["accessItem"];
        if (auth) {
            let rootModuleId = route.data["rootModuleId"];
            let childModuleName = route.data["childModuleName"];
            if (applicationModuleId != undefined) {
                if (route.data["keyName"])
                    id = route.params ? route.params[route.data["keyName"]] : undefined;
                let promise = new Promise<boolean>((resolve, reject) => {
                    var currentUserPermission = rootModuleId == undefined ? undefined : user.permissions.where(t => t.rootModuleId == rootModuleId)[0]  //Change for If Root Module Id Undefined then CurrentUserPermission is Undefined Ishani
                    var now = new Date();
                    if (childModuleName == undefined && (currentUserPermission == undefined || id != 0 || currentUserPermission.requestedDate < now)) {
                        this.userAuthorizationService.postAuthorize(
                            {
                                applicationModuleId: route.data["applicationModuleId"],
                                isApplicationAuthorized: isAppAuthorized,
                                id: id,
                            }
                        ).subscribe(t => {
                            let jObject = t.json();
                            if (!isAppAuthorized) {
                                user.authorizationBroadcast(jObject);
                                //jObject = jObject[rootModuleId];
                            }
                            if (applicationModuleId != 0) {
                                let userPermissionCache = new UserPermissionCache({ rootModuleId: rootModuleId, permission: jObject[rootModuleId], requestedDate: this.getDate() });
                                user.permissions.push(userPermissionCache);
                                if (accessItem == "F") {
                                    resolve(true);
                                    return;
                                }
                                this.resolvePromise(resolve, this.checkAccess(route.data, userPermissionCache))
                            } else {
                                this.resolvePromise(resolve, true);
                            }
                        }, error => {
                            this.resolvePromise(resolve, false);
                        })
                    }
                    else
                        this.resolvePromise(resolve, this.checkAccess(route.data, currentUserPermission || user.currentPermission))
                });
                return promise;
            } else {
                return true;
            }
        } else {
            this.userAuthorizationService.postLogOut().subscribe(t => {
                this.storage.local.clearAll();
                window.location.href = '/login';
            }, error => {
                this.storage.local.clearAll();
                window.location.href = '/login';
            })
        }
    }

    resolvePromise(resolve: any, isSuccess: boolean): void {
        if (isSuccess)
            resolve(isSuccess)
        else {
            resolve(false);

            this.storage.local.clearAll();
            window.location.href = '/login';
        }
    }

    checkAccess(data: any, userPermission: UserPermissionCache): boolean {
        user.currentPermission = userPermission;
        if ((userPermission.permission[data.applicationModuleId] && !data.childModuleName) || data.childModuleName == "undefined") {
            user.pagePermission = userPermission.permission[data.applicationModuleId];

            return userPermission.permission[data.applicationModuleId][data.accessItem] != undefined && userPermission.permission[data.applicationModuleId][data.accessItem];
        } else {
            if (data.childModuleName) {
                var applicationModuleId = ApplicationPage.get("applicationModuleId");
                var childModuleName = data.childModuleName.replace("-", "");
                return userPermission.permission[applicationModuleId] && userPermission.permission[applicationModuleId][childModuleName][data.accessItem] != undefined && userPermission.permission[applicationModuleId][childModuleName][data.accessItem];
            }
        }
        return false;
    }

    getDate(): Date {
        let now = new Date();
        return new Date(now.getTime() + this.minutes * 60000)
    }
}



