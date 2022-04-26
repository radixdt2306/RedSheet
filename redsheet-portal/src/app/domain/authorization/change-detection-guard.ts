import { CanDeactivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { ComponentCanDeactivate, ApplicationConfiguration, ApplicationBroadcaster } from "@rx/core";
import { RxDialog, DialogClick } from "@rx/view"
import { UserAuthorizationService } from './user-authorization.service';
import { Subscription } from "rxjs/Subscription";
import { Http, RequestOptions, RequestOptionsArgs,Headers } from "@angular/http";
import { RecordLock } from "app/domain/CanDeactivateTeam";
import { RxStorage } from "@rx/storage";
import { ReflectiveInjector, Inject } from "@angular/core";
import { API_HOST_URI } from "@rx/http";

export class ChangeDetectionGuard implements CanDeactivate<ComponentCanDeactivate> {
    changeDetectionEnabled: boolean = false;
    private userAuthorizationService: UserAuthorizationService
    private changeDetectionSubscription: Subscription;
    private dialog: RxDialog;
    storage:RxStorage
    public http:Http;
    constructor(@Inject(API_HOST_URI) private hostUri: string) {
            this.changeDetectionEnabled = ApplicationConfiguration.get("changeDetection")
            let injector: any = ReflectiveInjector.resolveAndCreate([RxStorage]);
            this.storage = injector.get(RxStorage);
    }

    canDeactivate(
        component: ComponentCanDeactivate,
        route: ActivatedRouteSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        
        
        let promise = new Promise<any>((resolve, reject) => {
            
            if(!route.data.component){
                var isDeactivate = true;
                this.unLock(route, resolve);
            }else
                resolve(true);
            
            // if (this.changeDetectionEnabled) {
            //     if (component.canDeactivate) {
            //         var canDeactivate = component.canDeactivate();
            //         if (typeof canDeactivate == "boolean") {
            //             if (canDeactivate)
            //                 this.unLock(route, resolve);
            //             else
            //                 this.showDialog(resolve);
            //         }
            //         else {
            //             canDeactivate = <Observable<boolean>>canDeactivate;
            //             canDeactivate.subscribe(t => {
            //                 if (t) {
            //                     this.unLock(route, resolve)
            //                 } else
            //                     this.showDialog(resolve);
            //             })
            //         }
            //     } else {
            //         this.unLock(route, resolve);
            //     }
            // } else
            //     resolve(true);
        });
        return promise;

    }

    private showDialog(resolve: any) {
        this.dialog.confirmation([], 'dataLost').then((dialogClick: DialogClick) => {
            resolve(dialogClick == DialogClick.PrimaryOk);
        })
    }

    private unLock(route: any, resolve: any): void {
        
        if (route.data) {
            var applicationModuleId = route.data["applicationModuleId"];
            var keyName = route.data["keyName"];
            var keyValue = undefined;
            if (route.params && route.params[keyName])
                keyValue = route.params[keyName];
            else
                keyValue = route.data[keyName];
            if (keyValue != undefined) {
                var data = {
                    applicationModuleId: applicationModuleId,
                    mainRecordId: keyValue,
                    childModuleName: (route.data["childModuleName"]) ? route.data["childModuleName"] : "default"
                };

                let auth = this.storage.local.get('auth');
                let lockRecordId = RecordLock.lockId[data.applicationModuleId];
                var headers = new Headers();
                headers.append("Content-Type", "application/json");
                headers.append("Authorization", auth);
                var params:any = {headers:headers};
                var req = new XMLHttpRequest();
                req.open('DELETE', this.hostUri.concat(`api/recordlocks/${lockRecordId}`), true);
                req.setRequestHeader("authorization",auth);
                req.send();
                resolve(true);

                // this.userAuthorizationService.unLockRecord(data).subscribe(t => {
                //     resolve(true);
                // })
            }
        } else {
            resolve(true);
        }
    }
    beforeRequest(a:any,b:any) {
        if (a.readyState == 4 && a.status == 200) {
    //      resolve(true)
        }
      }
}