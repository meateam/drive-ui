import { AdvancedSearchEnum } from './advancedSearchEnum';

export function validationAdvancedSearchFactory(advancedSearchEnum) {
    switch (advancedSearchEnum) {
        case AdvancedSearchEnum.FindByT:
            return (value) => value && !String(value).includes('@') ? null : AdvancedSearchEnum.FindByT;
        case AdvancedSearchEnum.FindByMail:
            return (value) => value && !String(value).includes('@') ? null : AdvancedSearchEnum.FindByMail;
        default:
            return () => null;
    }
}
