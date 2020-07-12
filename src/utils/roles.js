export const Roles = {
    owner: "OWNER",
    write: "WRITE",
    read: "READ"
};

export function uploadRole(role) {
    return role == Roles.write || role == Roles.owner;
}

export function deleteRole(role) {
    return role == Roles.write || role == Roles.owner;
}

export function shareRole(role) {
    return role == Roles.write || role == Roles.owner;
}

export function editRole(role) {
    return role == Roles.write || role == Roles.owner;
}

export function moveRole(role) {
    return role == Roles.write || role == Roles.owner;
}