/**
 * getDate return the formated creation date
 * @param d is the date to format
 */
export function formatDate(d) {
    const date = new Date(d);
    return date.toLocaleString('en-GB');
}