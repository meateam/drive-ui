import * as usersApi from "@/api/users";
import store from "@/store";

export async function formatFile(file) {
    if (file.ownerId === store.state.auth.user.id) file.owner = "אני";
    else file.owner = await usersApi.getUserNameByID(file.ownerId);
    return file;
}