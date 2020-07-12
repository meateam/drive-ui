export const Roles = {
    owner: "OWNER",
    write: "WRITE",
    read: "READ"
};

export function writeRole(role) {
    return role == Roles.write || role == Roles.owner;
}

export function ownerRole(role) {
    return role == Roles.owner;
}
