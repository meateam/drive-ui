import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";

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