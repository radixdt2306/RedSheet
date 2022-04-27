import { User } from "app/database-models";
import { ApplicationModule } from "app/models";
export class ExceptionLogLookupGroup {
    users: User[];
    applicationModules: ApplicationModule[];
}

export class ExceptionLogViewModel {
    applicationExceptionLogId: number;

    message: string;
    fullName: string;
    moduleMasterName: string;
}

