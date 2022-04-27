import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { redSheetLitePdfComponent } from 'app/components/redSheet-lite-report/redSheet-lite-pdf/redSheet-lite-pdf';




const PDF_ROUTES: Routes = [{
    path: '', component: redSheetLitePdfComponent
},
];

export const PDF_ROUTING: ModuleWithProviders = RouterModule.forChild(PDF_ROUTES);