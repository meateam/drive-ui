export function formatUser(user) {
  const formatedUser = user;
  formatedUser.display = `${user.firstName} ${user.lastName ? user.lastName : ""} (${user.id}) > ${user.hierarchyFlat}`;
  return formatedUser;
}
