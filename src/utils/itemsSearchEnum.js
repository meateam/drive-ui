export const ItemsSearchEnum = {
  DefaultSearch: 'DefaultSearch',
  AdvancedSearch: 'AdvancedSearch',
};
Object.freeze(ItemsSearchEnum);

export function GetTypeField(field) {
  switch (field) {
    case 'owner':
      return 'user';
    case 'date':
      return 'date';
    default:
      return 'string';
  }
}
