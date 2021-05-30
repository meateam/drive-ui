export const ItemsSearchEnum = {
  DefaultSearch: "DefaultSearch",
  AdvancedSearch: "AdvancedSearch",
};
Object.freeze(ItemsSearchEnum);

export const ItemsSeacrhTypesEnum = {
  String: "string",
  Date: "date",
  User: "user",
};
Object.freeze(ItemsSeacrhTypesEnum);

export function GetTypeField(field) {
  switch (field) {
    case "owner":
      return ItemsSeacrhTypesEnum.User;
    case "date":
      return ItemsSeacrhTypesEnum.Date;
    default:
      return ItemsSeacrhTypesEnum.String;
  }
}

export function GetIconField(field) {
  switch (field) {
    case "owner":
      return "person";
    case "date":
      return "date_range";
    case "filename":
      return "title";
    case "content":
      return "description";
    default:
      return "";
  }
}
