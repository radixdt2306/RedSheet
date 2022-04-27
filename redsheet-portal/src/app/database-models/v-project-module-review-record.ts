import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectModuleReviewRecord {
    constructor(vProjectModuleReviewRecord?: vProjectModuleReviewRecord )  {
        let properties = [ "feedback", "projectModuleId", "projectModuleReviewId",];
        for (let property of properties)
            if (vProjectModuleReviewRecord && vProjectModuleReviewRecord[property])
                this[property] = vProjectModuleReviewRecord[property];
    }
 
    @required()
	feedback : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleReviewId : number =   undefined;


}
