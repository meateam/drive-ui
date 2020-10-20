import * as usersApi from "@/api/users";
import store from "@/store";

export async function formatFile(file) {
  const formattedFile = file;
  if (file.ownerId === store.state.auth.user.id) {
    formattedFile.owner = "אני";
  } else {
    // const user = await usersApi.getUserByID(file.ownerId).catch(() => {
    //   return;
    // });
    // formattedFile.owner = user ? user.fullName : "???";
    formattedFile.owner = "???";
  }
  return formattedFile;
}

export async function formatExternalFile(file) {
  const formattedFile = file;
  const user = await usersApi.getExternalUserByID(file.ownerId).catch(() => {
    return;
  });
  formattedFile.owner = user ? user.fullName : "???";
  return formattedFile;
}
