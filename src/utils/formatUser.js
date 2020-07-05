export function formatUser(user) {
    const formatedUser = user;
    formatedUser.display = `${user.firstName} ${
        user.lastName ? user.lastName : ""
        } > ${user.hierarchyFlat}`;
    return formatedUser;
}

export function formatExternalUser(user) {
    const formatedUser = user;
    formatedUser.display = `${user.hierarchy} < ${user.full_name}`;
    formatedUser.firstName = user.first_name;
    formatedUser.lastName = user.last_name;
    formatedUser.fullName = user.full_name;
    formatedUser.hierarchyFlat = user.hierarchy;
    return formatedUser;
}