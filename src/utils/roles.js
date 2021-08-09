export const Roles = {
  owner: "OWNER",
  write: "WRITE",
  read: "READ",
};
Object.freeze(Roles);

export function writeRole(role) {
  return [Roles.write, Roles.owner].includes(role);
}

export function ownerRole(role) {
  return role == Roles.owner;
}
