/**
 * getDate return the formated creation date
 * @param d is the date to format
 */
export function formatDate(d) {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}.${month}.${year} ${hour}:${minutes}`;
}