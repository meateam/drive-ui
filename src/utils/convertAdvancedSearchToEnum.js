import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";
import i18n from "@/i18n";


export function AdvancedSearchToEnum(advancedSearch) {
    switch (advancedSearch) {
        case "SearchByT":
            return AdvancedSearchEnum.FindByT;
        case "SearchByMail":
            return AdvancedSearchEnum.FindByMail;
        default:
            return AdvancedSearchEnum.SearchByName;
    }
}

export function SearchToEnum(advancedSearch) {
    switch (advancedSearch) {
        case i18n.t("share.searchOptions.name"):
            return AdvancedSearchEnum.SearchByName;
        case i18n.t("share.searchOptions.id"):
            return AdvancedSearchEnum.FindByMail;
        default:
            return AdvancedSearchEnum.SearchByName;
    }
}