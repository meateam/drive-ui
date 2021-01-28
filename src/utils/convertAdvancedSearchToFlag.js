import { AdvancedSearchFlags } from "@/utils/advancedSearchFlags";

export function AdvancedSearchToFlag(advancedSearch) {
    switch (advancedSearch) {
        case "SearchByT":
            return AdvancedSearchFlags.FindByTFlag;
        case "SearchByMail":
            return AdvancedSearchFlags.FindByMailFlag;
        default:
            return AdvancedSearchFlags.SearchByNameFlag;
    }
}