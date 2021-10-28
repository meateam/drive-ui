/**
 * Generates unique upload id
 * @return {String} Unique upload id
 */
export const generateUId = () => {
  const date = Date.now();
  const random = Math.random()
    .toString(36)
    .substring(2);
  return `${date}${random}`;
}
