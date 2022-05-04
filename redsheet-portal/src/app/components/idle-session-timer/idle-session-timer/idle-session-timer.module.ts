import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleSessionTimerComponent } from '../idle-session-timer.component';
import { IdleSessionTimerService } from '../idle-session-timer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IdleSessionTimerComponent],
  providers: [IdleSessionTimerService]
})
export class IdleSessionTimerModule { }
