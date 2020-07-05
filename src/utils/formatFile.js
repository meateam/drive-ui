import * as usersApi from "@/api/users";
import * as shareApi from "@/api/share";
import store from "@/store";
import { formatDate } from "@/utils/formatDate";

export async function formatFile(file) {
    if (file.ownerId === store.state.auth.user.id) file.owner = "אני";
    else file.owner = await usersApi.getUserNameByID(file.ownerId);

    file.createdAt = await formatDate(file.createdAt);
    file.updatedAt = await formatDate(file.updatedAt);

    file.permissions = await shareApi.getPermissions(file.id);
    file.permits = await shareApi.getExternalPermissions(file.id);

    return file;
}