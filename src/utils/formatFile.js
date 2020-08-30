import * as usersApi from "@/api/users";
import store from "@/store";

export async function formatFile(file) {
  if (file.ownerId === store.state.auth.user.id) {
    file.owner = "אני";
  } else {
    const user = await usersApi.getUserByID(file.ownerId);
    file.owner = user.fullName;
  }
  return file;
}

export async function formatExternalFile(file) {
  if (file.ownerId === store.state.auth.user.id) {
    file.owner = "אני";
  } else {
    const user = await usersApi.getExternalUserByID(file.ownerId);
    file.owner = user.fullName;
  }
  return file;
}
