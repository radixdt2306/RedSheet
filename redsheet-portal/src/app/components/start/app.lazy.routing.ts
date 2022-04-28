import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserAuthorizationService, PageAccess } from "../../domain/authorization";

import { APP_ROUTES } from './app.routing';
import { REQUEST_METHOD_LIST, REQUEST_METHOD_FULL } from "app/domain/const";
import { UnAuthorizedComponent } from "app/components/unauthorized/unauthorized.component";
import { LoginComponent } from "app/components/login/login/login.component";
import { NotFoundComponent } from "app/components/not-found/not-found.component";


const APP_LAZY_ROUTES: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [PageAccess], data: { applicationModuleId: 33, accessItem: 'F',test:'abc' }
    },
    {
        path: 'unauthorized', component: UnAuthorizedComponent,
        canActivate: [PageAccess], data: { applicationModuleId: 38, accessItem: REQUEST_METHOD_FULL }
    },
    //{
    //    path: '**', component: NotFoundComponent,
    //    canActivate: [PageAccess], data: { applicationModuleId: 1038, accessItem: REQUEST_METHOD_FULL }
    //},
    {
        path: 'forgot-password',
        loadChildren: './components/login/forgot-password/forgot-password.module#ForgotPasswordModule',
    },
    {
        path: 'reset-password',
        loadChildren: './components/login/reset-password/reset-password.module#ResetPasswordModule',
    },
    {
        path: 'user-profile',
        loadChildren: './components/user-profile/user-profile.module#UserProfileModule',
        canActivate: [PageAccess], data: { applicationModuleId: 5133, accessItem: 'F' }
    },
    {
        path: 'dashboard',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule',
        canActivate: [PageAccess], data: { applicationModuleId: 5104, accessItem: REQUEST_METHOD_FULL }
    },
    {
        path: 'languages',
        loadChildren: './components/languages/languages.module#LanguagesModule',
        canActivate: [PageAccess], data: { applicationModuleId: 18, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
    },
    {
        path: 'multilingual',
        loadChildren: './components/multilingual/multilingual.module#MultilingualModule',
        //canActivate: [PageAccess], data: { applicationModuleId: 20, accessItem: REQUEST_METHOD_LIST, rootModuleId:16 }
    },
    {
        path: 'exception-logs',
        loadChildren: './components/exception-logs/exception-log.module#ExceptionLogModule',
        //canActivate: [PageAccess], data: { applicationModuleId: 27, accessItem: REQUEST_METHOD_LIST,rootModuleId:25 }
    },
    {
        path: 'global-settings',
        loadChildren: './components/global-settings/global-settings.module#GlobalSettingsModule',
        canActivate: [PageAccess], data: { applicationModuleId: 21, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
    },
    {
        path: 'request-logs',
        loadChildren: './components/request-logs/request-log.module#RequestLogModule',
        //canActivate: [PageAccess], data: { applicationModuleId: 26, accessItem: REQUEST_METHOD_LIST, rootModuleId: 25 }
    },
    {
        path: 'audit-logs',
        loadChildren: './components/audit-logs/audit-log.module#AuditLogModule',
        //canActivate: [PageAccess], data: { applicationModuleId: 28, accessItem: REQUEST_METHOD_LIST, rootModuleId: 25 }
    },
    {
        path: 'modules',
        loadChildren: './components/modules/list/modules-list.module#ModulesListModule',
        canActivate: [PageAccess], data: { applicationModuleId: 2, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
    },
    //{
    //    path: 'generator',
    //    loadChildren: './components/codegenerator/codegenerator.module#CodeGeneratorModule',
    //},
    //{
    //    path: 'modulesHierarchy',
    //    loadChildren: './components/modules-hierarchy/modules-hierarchy.module#ModulesHierarchyModule',
    //},
    //{
    //    path: 'role-permissions',
    //    loadChildren: './components/role-permission/role-permission.module#RolePermissionModule',
    //},
    {
        path: 'roles',
        loadChildren: './components/roles/roles.module#RolesModule',
    },
    {
        path: 'user-profile',
        loadChildren: './components/user-profile/user-profile.module#UserProfileModule',
        canActivate: [PageAccess], data: { applicationModuleId: 32, accessItem: REQUEST_METHOD_FULL, rootModuleId: 34 }
    },
    {
        path: 'users',
        loadChildren: './components/users/users.module#UsersModule',
    },
    
    {
        path: 'email-configuration',
        loadChildren: './components/email-configurations/email-configuration.module#EmailConfigurationModule',
        canActivate: [PageAccess], data: { applicationModuleId: 35, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
    },
    {
        path: 'password-policy',
        loadChildren: './components/password-policy/password-policy.module#PasswordPolicyModule',
        canActivate: [PageAccess], data: { applicationModuleId: 1040, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
    },
	
	{
        path: 'project-background/:projectModuleId',
        loadChildren: './components/project-background/project-background.module#ProjectBackgroundModule'
    },
	{
        path: 'project-culture/:projectModuleId',
        loadChildren: './components/project-culture/project-culture.module#ProjectCultureModule',
    },
	{
        path: 'project-negotionality/:projectModuleId',
        loadChildren: './components/project-negotionality/project-negotionality.module#ProjectNegotionalityModule',
    },
	{
        path: 'project-stakeholder/:projectModuleId',        
        loadChildren: './components/project-stakeholder/project-stakeholder.module#ProjectStakeholderModule',
    },
	{
        path: 'project-culture-plan/:projectModuleId',
        loadChildren: './components/project-culture-plan/project-culture-plan.module#ProjectCulturePlanModule',
    },
	{
        path: 'project-game/:projectModuleId',
        loadChildren: './components/project-game/project-game.module#ProjectGameModule',
    },
	{
        path: 'project-learning/:projectModuleId',
        loadChildren: './components/project-learning/project-learning.module#ProjectLearningModule',
    },
	{
        path: 'project-negotiation/:projectModuleId',
        loadChildren: './components/project-negotiation/project-negotiation.module#ProjectNegotiationModule',
    },
	{
        path: 'project-power/:projectModuleId',
        loadChildren: './components/project-power/project-power.module#ProjectPowerModule',
    },
	{
        path: 'project-preparation/:projectModuleId',
        loadChildren: './components/project-preparation/project-preparation.module#ProjectPreparationModule',
    },
	{
        path: 'project-requirement/:projectModuleId',
        loadChildren: './components/project-requirement/project-requirement.module#ProjectRequirementModule',
    },
	{
        path: 'project',                
        loadChildren: './components/project/project.module#ProjectModule',
        canActivate: [PageAccess], data: { applicationModuleId: 34, accessItem: REQUEST_METHOD_FULL }
    },
	{
        path: 'project-event-timelines/:projectModuleId',
        loadChildren: './components/project-event-timeline/project-event-timelines/project-event-timelines.module#ProjectEventTimelinesModule',
    },
    {
        path: 'project-post-event/:projectModuleId',
        loadChildren: './components/post-event/post-event.module#PostEventModule',
    },
	{
        path: 'lite-project-backgrounds/:projectModuleId',
        loadChildren: './components/lite-project-background/lite-project-backgrounds/lite-project-backgrounds.module#LiteProjectBackgroundsModule',
    },
	{
        path: 'lite-meeting-managements/:projectModuleId',
        loadChildren: './components/lite-meeting-management/lite-meeting-managements/lite-meeting-managements.module#LiteMeetingManagementsModule',
    },
	{
        path: 'nano-scope-to-negotiate-objectives/:projectModuleId',
        loadChildren: './components/nano-scope-to-negotiate-objective/nano-scope-to-negotiate-objectives/nano-scope-to-negotiate-objectives.module#NanoScopeToNegotiateObjectivesModule',
    },
    {
        path: 'nano-negotiation-plan/:projectModuleId',
        loadChildren: './components/nano-negotiation-plan/nano-negotiation-plan.module#NanoNegotiationPlanModule',
    },
	{
        path: 'recent-activity-and-notifications',
        loadChildren: './components/recent-activity-and-notification/recent-activity-and-notifications/recent-activity-and-notifications.module#RecentActivityAndNotificationsModule',
        canActivate: [PageAccess], data: { applicationModuleId: 6149, accessItem: 'F' }
    },
    {
        path: 'email-transaction',
        loadChildren: 'app/components/email-transaction/email-transaction.module#EmailTransactionModule',
        canActivate: [PageAccess], data: { applicationModuleId: 6149, accessItem: 'F' }
    },
    // {
    //     path: 'pdf',
    //     component: PdfComponent, data: { anonymous: true }, 
    // },
    {
        path: 'pdf',
        loadChildren: './components/pdf/pdf.module#PdfModule',
    },
    {
        path: 'redSheet-lite-report',
        loadChildren: './components/redSheet-lite-report/redSheet-lite-report.module#LitePdfModule',
    },
    {
        path: 'redSheet-nano-report',
        loadChildren: './components/redSheet-nano-report/redSheet-nano-report.module#NanoPdfModule',
    },
//route-paths
];

APP_ROUTES.forEach(t => APP_LAZY_ROUTES.push(t));

export const APP_LAZY_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_LAZY_ROUTES,{useHash:true});
