export function formatUser(user, addUserId = false) {
  const formatedUser = user;
  formatedUser.display = `${user.firstName} ${user.lastName ? user.lastName : ""} > ${user.hierarchyFlat} ${
    addUserId ? `(${user.id})` : ""
  }`;
  return formatedUser;
}
