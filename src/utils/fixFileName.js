export function fixFileName(name) {
    const newName = name.replace(/_/g, " ");
    return newName;
}