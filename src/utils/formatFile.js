import * as usersApi from "@/api/users";
import store from "@/store";

export function isFileOwner(ownerID) {
  return ownerID === store.state.auth.user.id;
}

export async function getFileOwnerName(ownerID) {
  const user = await usersApi.getUserByID(ownerID).catch(() => {
    return;
  });
  return user ? user.fullName : "???";
}

export async function getExternalFileOwnerName(ownerID) {
  const user = await usersApi.getExternalUserByID(ownerID).catch(() => {
    return;
  });
  return user ? user.fullName : "???";
}
