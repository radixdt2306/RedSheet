import { ComponentContainer } from "@rx/core"
import { LanguageContentMultilingualComponent } from "app/components/multilingual/language-content-multilingual/language-content-multilingual.component";
import { REQUEST_METHOD_LIST } from "app/domain/const";
import { ModuleContentMultilingualComponent } from "app/components/multilingual/module-content-multilingual/module-content-multilingual.component";

export const MULTILINGUAL_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
    {
        component: LanguageContentMultilingualComponent,
        accessItem: REQUEST_METHOD_LIST,
        applicationModuleId: 0,
        keyName: 'languageContentId',
        childModuleName: 'language-content',
        rootModuleId: 0
    },
    {
        component: ModuleContentMultilingualComponent,
        accessItem: REQUEST_METHOD_LIST,
        applicationModuleId: 0,
        keyName: 'moduleContentId',
        childModuleName: 'module-content',
        rootModuleId: 0
    },
];

