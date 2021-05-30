import * as usersApi from "@/api/users";
import store from "@/store";

export function isFileOwner(ownerID) {
  return ownerID === store.state.auth.user.id;
}

export async function getFileOwnerName(ownerID) {
  try {
    const user = store.state.directonary.usersDictionary[ownerID] ||
      await usersApi.getUserByID(ownerID)
    return user.fullName;
  } catch (_) {
    return "";
  }
}

export async function getExternalFileOwnerName(ownerID, destination) {
  try {
    const user = store.state.directonary.usersDictionary[ownerID] ||
      await usersApi.getExternalUserByID(ownerID, destination)
    return user.fullName;
  } catch (_) {
    return "";
  }
}
