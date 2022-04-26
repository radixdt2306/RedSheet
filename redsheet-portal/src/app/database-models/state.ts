import { required, maxLength, range, nested } from '@rx/annotations';
import { Country,  } from './'
export class State {
    constructor(state?: State )  {
        let properties = [ "stateId", "stateName", "stateShortName", "statusId", "countryId",];
        for (let property of properties)
            if (state && state[property])
                this[property] = state[property];
    }
 
	stateId : number =   0 ;
 
    @required()
    @maxLength(100)
	stateName : string =   undefined;
 
    @maxLength(10)
	stateShortName : string =   undefined;
 
	statusId : number =   undefined;
 
    @range(0,2147483647)
	countryId : number =   undefined;
	country : Country  ;


}
