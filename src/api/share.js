import Axios from "axios";
import store from "@/store";
import * as usersApi from "@/api/users";
import { baseURL } from "@/utils/config";

/**
 * getPermissions returns all the user id`s of the users that was shared with the file
 * @param fileID the id of the file
 */
export async function getPermissions(fileID) {
    try {
        const res = await Axios.get(`${baseURL}/api/files/${fileID}/permissions`);
        const users = await usersApi.getUsersByIDs(
            res.data.map((permission) => permission.userID)
        );
        return users;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * getExternalPermissions returns all the user id`s of the extenal users that was shared with the file
 * @param fileID the id of the file
 */
export async function getExternalPermissions(fileID) {
    try {
        const res = await Axios.get(`${baseURL}/api/files/${fileID}/permits`);
        const users = await usersApi.getExternalUsersByIDs(
            res.data ? res.data.map((permit) => permit.userId) : []
        );
        return users;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * shareUser adds a permision on a file to another user
 * @param fileID is the id of the file to share
 * @param userID is the id of the user ro share
 * @param role is the role of the share
 */
export async function shareUser({ fileID, userID, role }) {
    try {
        const res = await Axios.put(
            `${baseURL}/api/files/${fileID}/permissions`,
            {
                userID,
                role,
                override: true,
            }
        );
        const user = await usersApi.getUserByID(res.data.userID);
        store.commit("onUserShare", { fileID, user });
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * shareUser adds a permision on the files to all the users
 * @param files is the list of the files to share
 * @param users is the list of the users to share
 * @param role is the role of the share
 */
export function shareUsers({ files, users, role }) {
    users.forEach(async (user) => {
        files.forEach(async (file) => {
            await shareUser({ fileID: file.id, userID: user.id, role });
        });
    });
}

export async function shareExternalUsers(
    { fileID, users, classification, info, approvers, fileName }
) {
    try {
        const body = { users, classification, info, approvers, fileName };
        const res = await Axios.put(`${baseURL}/api/files/${fileID}/permits`, body);
        users.forEach((user) => store.commit("onExternalUserShare", { fileID, user }));
        return res.data;
    } catch (err) {
        throw new Error(err)
    }
}

