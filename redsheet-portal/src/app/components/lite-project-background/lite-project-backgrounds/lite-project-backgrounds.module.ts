import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { LITE_PROJECT_BACKGROUNDS_ROUTING } from './lite-project-backgrounds.routing';
import { LiteProjectBackgroundsService } from './lite-project-backgrounds.service';

@NgModule({
    imports: [LITE_PROJECT_BACKGROUNDS_ROUTING],
    exports: [RouterModule],
    providers: [LiteProjectBackgroundsService]
})
export class LiteProjectBackgroundsModule { }