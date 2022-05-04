import { Component, Input, OnInit } from '@angular/core';
import { IdleSessionTimerService } from './idle-session-timer.service';
import { RxPopup } from "@rx/view";

@Component({
  // selector: 'app-idle-session-timer',
  templateUrl: './idle-session-timer.component.html',
  // styleUrls: ['./idle-session-timer.component.css']
})
export class IdleSessionTimerComponent implements OnInit {

  constructor(private idleSessionTimer:IdleSessionTimerService , private popup:RxPopup) { }
  
  @Input() remainingTime:number 

  showComponent:boolean=false;
  ngOnInit(): void {
    this.showComponent=true;
  }

  Extend()
  {
    this.popup.hide(IdleSessionTimerComponent);
    this.idleSessionTimer.ExpandSession();
  }

  SignOut()
  {
    this.idleSessionTimer.logOut();
    this.popup.hide(IdleSessionTimerComponent);
  }


}
