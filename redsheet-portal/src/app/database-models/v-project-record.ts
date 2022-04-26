import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectRecord {
    constructor(vProjectRecord?: vProjectRecord )  {
        let properties = [ "isClosed", "ownerId", "ownerName", "projectId", "projectName", "projectNote", "status", "templateGroupId", "templateGroupName", "templateId",];
        for (let property of properties)
            if (vProjectRecord && vProjectRecord[property])
                this[property] = vProjectRecord[property];
    }
 
	isClosed : boolean = false ;
 
    @range(1,2147483647)
	ownerId : number =   undefined;
 
    @required()
    @maxLength(201)
	ownerName : string =   undefined;
 
	projectId : number =   0 ;
 
    @required()
    @maxLength(200)
	projectName : string =   undefined;
 
    @maxLength(1000)
	projectNote : string =   undefined;
 
	status : boolean = false ;
 
    @required()
	templateGroupId : string =   undefined;
 
    @required()
    @maxLength(500)
	templateGroupName : string =   undefined;
 
    @range(1,2147483647)
	templateId : number =   undefined;


}
