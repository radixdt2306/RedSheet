import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectModuleRecord {
    constructor(vProjectModuleRecord?: vProjectModuleRecord )  {
        let properties = [ "createdBy", "createdOn", "htmlHelp", "isClosed", "moduleOrder", "note", "ownerId", "ownerName", "ownerNote", "projectId", "projectModuleId", "projectName", "projectNote", "status", "templateModuleId", "templateModuleName",];
        for (let property of properties)
            if (vProjectModuleRecord && vProjectModuleRecord[property])
                this[property] = vProjectModuleRecord[property];
    }
 
    @range(1,2147483647)
	createdBy : number =   undefined;
 
    @required()
	createdOn : Date =   undefined;
 
    @required()
	htmlHelp : string =   undefined;
 
	isClosed : boolean = false ;
 
    @range(1,2147483647)
	moduleOrder : number =   undefined;
 
    @maxLength(1000)
	note : string =   undefined;
 
    @range(1,2147483647)
	ownerId : number =   undefined;
 
    @required()
    @maxLength(201)
	ownerName : string =   undefined;
 
	ownerNote : string =   undefined;
 
	projectId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(200)
	projectName : string =   undefined;
 
    @maxLength(1000)
	projectNote : string =   undefined;
 
	status : boolean = false ;
 
    @range(1,2147483647)
	templateModuleId : number =   undefined;
 
    @required()
    @maxLength(200)
	templateModuleName : string =   undefined;


}
