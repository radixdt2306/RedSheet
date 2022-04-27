export class GeneratorContext {
    generatorContextId: number;

    applicationModuleId: number;

    rootModuleId: number;

    applicationModuleName: string;

    isMainDbContext: boolean;

    generatorControllers: GeneratorController[];
}

export class GeneratorConfiguration {
    generatorConfigurationId: number;

    tableAnnotations: string;

    enttityNameSpaces: string;

    contextNameSpaces: string;

}

export class GeneratorContextLookup {
    generatorLookupId: number;

    generatorControllerId: number;

    generatorModelId: number;

}

export class GeneratorContextView {
    generatorContextViewId: number;

    generatorContextId: number;

    generatorModelId: number;

}

export class GeneratorController {
    generatorControllerId: number;

    applicationModuleId: number;

    rootModuleId: number;

    generatorModelId: number;

    parentControllerId: number;


    moduleMasterName: string;

    controllerDescription: string;

    complexityType: boolean

    isShared: boolean;

    isChildrenController: boolean;

    isSearchController: boolean;
    isDataVerification: boolean;

    generatorContextId: number;
    generatorContext: GeneratorContext

}

export class vGeneratorModel {
    generatorModelId: number;
    generatorModelName: string;
    generatorModelType: string;
}

export class vGeneratorConfiguration {
    generatorConfigurationId: number;
    entityNameSpaces: string;
}