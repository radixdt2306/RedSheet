import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { PROJECT_LEARNING_ROUTING } from './project-learning.routing';

@NgModule({
    imports: [PROJECT_LEARNING_ROUTING],
    exports: [RouterModule]
})
export class ProjectLearningModule { }
