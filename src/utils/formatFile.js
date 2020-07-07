import * as usersApi from "@/api/users";
import * as shareApi from "@/api/share";
import store from "@/store";

export async function formatFile(file) {
    if (file.ownerId === store.state.auth.user.id) file.owner = "אני";
    else file.owner = await usersApi.getUserNameByID(file.ownerId);

    file.permissions = await shareApi.getPermissions(file.id);
    file.permits = await shareApi.getExternalPermissions(file.id);

    return file;
}