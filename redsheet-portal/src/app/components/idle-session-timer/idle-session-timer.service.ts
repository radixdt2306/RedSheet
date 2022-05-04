import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { IdleSessionTimerComponent } from './idle-session-timer.component';

import { UserAuthorizationService } from '../../../app/domain/authorization/user-authorization.service';
import { RxStorage } from "@rx/storage"
import { RxPopup } from "@rx/view"

import * as $ from '../../../assets/js/jquery.min.js';

@Injectable()
export class IdleSessionTimerService {

  constructor(private userAuthorizationService:UserAuthorizationService , private storage: RxStorage, private popup:RxPopup) { }

  CheckForIdle:boolean=false;
  count:number=0
  private timer:Observable<number>;
  SessionTime:number = 30;
  SessionExpireAfter:number = 15;
  private timerSubscription: Subscription = new Subscription;
  sessionmodalelement:any;
  modal:any;
  //
  
  StartTimer()
  {
    this.CheckForIdle = true;
    this.StopTimer();
    this.timer = timer(0,1000);
    this.timerSubscription = this.timer.subscribe(
      res => {
        if(res as number)
        {
          $(document).mousemove(()=>{if(this.CheckForIdle == true){this.ExpandSession();}})
          $(document).keydown(()=>{if(this.CheckForIdle == true){this.ExpandSession();}})

          this.SessionTime = this.SessionTime-1;
          if(res == this.SessionExpireAfter)
          {
            this.CheckForIdle = false;
              this.popup.show(IdleSessionTimerComponent,{remainingTime : this.SessionTime});
          }
          if(this.SessionTime == 0)
          {
            this.logOut();
            this.popup.hide(IdleSessionTimerComponent);
          }
        }
      }
    );
  }

  StopTimer()
  {
      this.timerSubscription.unsubscribe();
      this.timer = new Observable<number>();
  }

  ExpandSession()
  {
    this.SessionTime = 30;
    this.StartTimer();
    
  }

  CloseTimer()
  {
    this.StopTimer();
    console.log("logout");
  }
  
  logOut(): void {
    // this.isOpenUserProfile = !this.isOpenUserProfile
    this.userAuthorizationService.postLogOut().subscribe(t => {
        this.storage.local.clearAll();
        document.cookie = "academyUrl=; samesite=Lax;";
        window.location.href = '/login';
    }, error => {
        this.storage.local.clearAll();
        document.cookie = "academyUrl=; samesite=Lax;";
        window.location.href = '/login';
    })
    console.log("DELETE COOKIE");
    this.CloseTimer();
    // ldle timer close
  }

}
