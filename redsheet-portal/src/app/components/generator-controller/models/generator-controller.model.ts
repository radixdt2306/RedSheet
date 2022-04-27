import { ModuleMaster } from "app/database-models";
import { GeneratorContext, vGeneratorModel } from "app/generator-models";

export class GeneratorControllerLookupGroup {
    contexts: GeneratorContext[];
    generatorModels: vGeneratorModel[];
    generatorViews: vGeneratorModel[];
}
