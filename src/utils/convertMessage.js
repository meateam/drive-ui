import { fileTypes } from "@/config";

export function convertMessageType(type) {
    if (type) {
        switch (type) {
            case fileTypes.officeConvert["doc"]: {
                return "ConvertDOC";
            }
            case fileTypes.officeConvert["xls"]: {
                return "ConvertXLS";
            }
            case fileTypes.officeConvert["ppt"]: {
                return "ConvertPPT";
            }
        }
    }
}