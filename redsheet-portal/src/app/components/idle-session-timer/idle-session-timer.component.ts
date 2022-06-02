import { Component, OnInit } from '@angular/core';
import { IdleSessionTimerService } from './idle-session-timer.service';
import { RxPopup } from "@rx/view";
import { Subscriber, Subscription } from 'rxjs';

@Component({
  // selector: 'app-idle-session-timer',
  templateUrl: './idle-session-timer.component.html',
  // styleUrls: ['./idle-session-timer.component.css']
})
export class IdleSessionTimerComponent implements OnInit {

  constructor(private popup:RxPopup) { }
  
  remainingTime:number 
  intervalSubscriber:any;
  showComponent:boolean=false;
  ngOnInit(): void {
    this.showComponent=true;
    this.intervalSubscriber = setInterval(()=>{this.remainingTime = this.remainingTime-1; if(this.remainingTime==0){clearInterval(this.intervalSubscriber); }},1000);
  }

  Extend()
  {
    this.popup.hide(IdleSessionTimerComponent);
  }

  SignOut()
  {
    this.popup.hide(IdleSessionTimerComponent);
  }


}
