import { AdvancedSearchEnum } from './advancedSearchEnum';

export function validationAdvancedSearchFactory(advancedSearchEnum) {
    switch (advancedSearchEnum) {
        case AdvancedSearchEnum.FindByT:
            return (value) => value && !String(value).includes('@') ? null : AdvancedSearchEnum.FindByT;
            
        default:
            return () => null;
    }
}
