import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectModuleReviewer {
    constructor(vProjectModuleReviewer?: vProjectModuleReviewer )  {
        let properties = [ "projectModuleId", "projectModuleReviewerId", "userName",];
        for (let property of properties)
            if (vProjectModuleReviewer && vProjectModuleReviewer[property])
                this[property] = vProjectModuleReviewer[property];
    }
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleReviewerId : number =   undefined;
 
    @maxLength(50)
	userName : string =   undefined;


}
