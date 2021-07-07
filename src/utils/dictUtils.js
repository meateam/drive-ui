export function isDictEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function removeEmptyValuesFromDict(obj) {
  let tempObj = obj;

  // remove empty values from object
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null || obj[key] == "") delete tempObj[key];
  });

  return tempObj;
}
