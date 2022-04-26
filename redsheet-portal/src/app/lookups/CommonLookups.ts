import { LookupAction } from '@rx/http'

export class CommonLookups 
{
    static users : LookupAction = {
        controllerName: "Master",
        actionName: "users",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static applicationModules : LookupAction = {
        controllerName: "Master",
        actionName: "applicationModules",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    }; 

    static activeLanguages : LookupAction = {
        controllerName: "Master",
        actionName: "languages",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    }; 

    static moduleMasters : LookupAction = {
        controllerName: "Master",
        actionName: "moduleMasters",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    }; 

     static serverMessages : LookupAction = {
         controllerName: "Master",
        actionName: "serverMessages",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    }; 
     static dbOperationTypes: LookupAction = {
         controllerName: "Master",
         actionName: "dbOperationTypes",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     }; 
     static recordStatuses: LookupAction = {
         controllerName: "Master",
         actionName: "recordStatuses",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     }; 

     static languageContentTypes: LookupAction = {
         controllerName: "Master",
         actionName: "languageContentTypes",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     }; 
     static languageContentNames: LookupAction = {
         controllerName: "Master",
         actionName: "languageContentNames",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     }; 
     static applicationTimeZone: LookupAction = {
         controllerName: "Master",
         actionName: "applicationTimeZones",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     }; 
     static roles: LookupAction = {
         controllerName: "Master",
         actionName: "roles",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     };
     static securityQuestions: LookupAction = {
         controllerName: "Master",
         actionName: "securityQuestions",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     };
     static mainModuleMasters: LookupAction = {
         controllerName: "Master",
         actionName: "mainModuleMasters",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     };
     static applicationModuleMasters: LookupAction = {
         controllerName: "Master",
         actionName: "applicationModuleMasters",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     };
     static globalSettings: LookupAction = {
         controllerName: "Master",
         actionName: "globalSettings",
         cacheOption: {
            isVersionBase: true,
            tableName:''
        }
     };

     
}
