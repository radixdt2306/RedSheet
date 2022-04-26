import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, vNanoProjectNegotiableRecord } from './'
export class NanoProjectNegotiable {
    constructor(nanoProjectNegotiable?: NanoProjectNegotiable | vNanoProjectNegotiableRecord) {
        let properties = ["ldo", "mdo", "nanoProjectNegotiableId", "requirement", "projectModuleId",];
        for (let property of properties)
            if (nanoProjectNegotiable && nanoProjectNegotiable[property])
                this[property] = nanoProjectNegotiable[property];
    }

    @required()
    @maxLength(150)
    ldo: string = undefined;

    @required()
    @maxLength(150)
    mdo: string = undefined;

    nanoProjectNegotiableId: number = 0;

    @required()
    @maxLength(150)
    requirement: string = undefined;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;


}
