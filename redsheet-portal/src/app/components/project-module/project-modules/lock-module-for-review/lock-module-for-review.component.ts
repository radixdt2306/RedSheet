import { Component, OnInit } from '@angular/core';
import { ProjectModule } from 'app/database-models';
import { RxPopup } from '@rx/view';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lock-module-for-review',
  templateUrl: './lock-module-for-review.component.html',
  styleUrls: ['./lock-module-for-review.component.css']
})
export class LockModuleForReviewComponent implements OnInit {

  constructor(private popup : RxPopup,private router: Router) { 
    this.showComponent=true;
  }

  showComponent:boolean;
  next:any;
  current:ProjectModule;
  initialFlag:boolean;
  
  ngOnInit() {
    console.log("next",this.next);
    console.log("current",this.current);
    this.initialFlag = this.current.status;
    this.current.status=false;
  }

  isLock(event)
  {
    var value = (event.target as HTMLInputElement).checked;
    if(value)
    {
      this.current.status=true;
      console.log("true");
    }
    else
    {
      this.current.status=false;
      console.log("false");
    }
  }

  NextModule()
  {
    console.log("current",this.current);
    this.popup.hide(LockModuleForReviewComponent,this.current);
  }

  Cancel()
  {
    this.current.status = this.initialFlag;
    this.popup.hide(LockModuleForReviewComponent);
  }
}
