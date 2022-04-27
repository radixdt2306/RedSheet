import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeGeneratorComponent } from "app/components/codegenerator/codegenerator.component";


const CODEGENERATOR_ROUTES: Routes = [{
    path: '', component: CodeGeneratorComponent
},
];

export const CODEGENERATOR_ROUTING : ModuleWithProviders = RouterModule.forChild(CODEGENERATOR_ROUTES);