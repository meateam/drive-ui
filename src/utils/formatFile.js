import * as usersApi from "@/api/users";
import store from "@/store";

export function isFileOwner(ownerID) {
  return ownerID === store.state.auth.user.id;
}

export async function getFileOwnerName(ownerID) {
  const user =
    store.state.directonary.usersDictionary[ownerID] ||
    (await usersApi.getUserByID(ownerID).catch(() => {
      return;
    }));

  return user.fullName;
}

export async function getExternalFileOwnerName(ownerID, destination) {
  const user =
    store.state.directonary.usersDictionary[ownerID] ||
    (await usersApi.getExternalUserByID(ownerID, destination).catch(() => {
      return;
    }));

  return user.fullName;
}
