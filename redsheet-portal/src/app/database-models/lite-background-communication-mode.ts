import { required, maxLength, range, nested } from '@rx/annotations';
import { CommunicationMode, LiteProjectBackground,  } from './'
export class LiteBackgroundCommunicationMode {
    constructor(liteBackgroundCommunicationMode?: LiteBackgroundCommunicationMode )  {
        let properties = [ "liteBackgroundCommunicationModeId", "communicationModeId", "liteProjectBackgroundId", "isActive", "removeIndex",];
        for (let property of properties)
            if (liteBackgroundCommunicationMode && liteBackgroundCommunicationMode[property])
                this[property] = liteBackgroundCommunicationMode[property];
    }
 
	liteBackgroundCommunicationModeId : number =   0 ;
 
    @range(0,2147483647)
	communicationModeId : number =   undefined;
	communicationMode : CommunicationMode  ;
 
    @range(0,2147483647)
	liteProjectBackgroundId : number =   undefined;
	liteProjectBackground : LiteProjectBackground  ;

	isActive :  boolean=   undefined;
	removeIndex :  number=   undefined;

}
