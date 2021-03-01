export function formatUser(user) {
  const formatedUser = user;
  formatedUser.display = `${user.firstName} ${user.lastName ? user.lastName : ""} > ${user.hierarchyFlat}`;
  return formatedUser;
}
