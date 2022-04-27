import { User } from "app/database-models";
import { ApplicationModule } from "app/models";

export class RequestLogLookupGroup {
    users: User[];
    applicationModules:ApplicationModule[];
}

export class RequestLogViewModel {
    requestLogId: number;

    clientIPAddress: string;
    requestTime: string;
    totalDuration: string;
    moduleMasterName: string;
    fullName: string
}





