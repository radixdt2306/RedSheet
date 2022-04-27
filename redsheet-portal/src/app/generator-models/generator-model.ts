import { required, maxLength, range, } from '@rx/annotations';

export class GeneratorModels {
    constructor(generatorModels?: GeneratorModels) {
        let properties = ["generatorModelId", "generatorModelName","generatorModelType","isDataAuditable","isRecordAuditable","isSoftDelete","isAdditionalValidation","isDateConversion"];
        for (let property of properties)
            if (generatorModels && generatorModels[property])
                this[property] = generatorModels[property];
    }

    generatorModelId: number = 0;

    @required()
    @maxLength(100)
    generatorModelName: string = undefined;

    @required()
    @maxLength(10)
    generatorModelType: string = undefined;

    @required()
    isDataAuditable : boolean = false;

    @required()
    isRecordAuditable : boolean = false;

    @required()
    isSoftDelete:boolean=false;

    @required()
    isAdditionalValidation:boolean=false;

    @required()
    isDateConversion:boolean = false;
    
}
