import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { LITE_MEETING_MANAGEMENTS_ROUTING } from './lite-meeting-managements.routing';
import { LiteMeetingManagementsService } from './lite-meeting-managements.service';

@NgModule({
    imports: [LITE_MEETING_MANAGEMENTS_ROUTING],
    exports: [RouterModule],
    providers: [LiteMeetingManagementsService]
})
export class LiteMeetingManagementsModule { }