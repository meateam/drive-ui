import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";
import * as usersApi from "@/api/users";

/**
 * getPermissions returns all the user id`s of the users that was shared with the file
 * @param fileID the id of the file
 */
export async function getPermissions(fileID) {
  try {
    const res = await Axios.get(`${baseURL}/api/files/${fileID}/permissions`);
    const users = await Promise.all(
      res.data.map(async (permission) => {
        const user = await usersApi.getUserByID(permission.userID);
        user.role = permission.role;
        return user;
      })
    );
    return users;
  } catch (err) {
    store.dispatch("onError", err);
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
    store.dispatch("onError", err);
  }
}

/**
 * shareUser adds a permision on a file to another user
 * @param fileID is the id of the file to share
 * @param userID is the id of the user ro share
 * @param role is the role of the share
 */
async function shareUser({ fileID, userID, role }) {
  await Axios.put(`${baseURL}/api/files/${fileID}/permissions`, {
    userID,
    role,
    override: true,
  });
}

export async function editPermission({ fileID, userID, role }) {
  await shareUser({ fileID, userID, role })
    .then(() => {
      store.commit("onSuccess", "success.EditShare");
    })
    .catch((err) => {
      store.dispatch("onError", err);
    });
}

export async function removePermission({ userID, fileID }) {
  await Axios.delete(
    `${baseURL}/api/files/${fileID}/permissions?userId=${userID}`
  )
    .then(() => {
      store.commit("onSuccess", "success.DeleteShare");
    })
    .catch((err) => {
      store.dispatch("onError", err);
    });
}

/**
 * shareUser adds a permision on the files to all the users
 * @param files is the list of the files to share
 * @param users is the list of the users to share
 * @param role is the role of the share
 */
export function shareUsers({ files, users, role }) {
  return Promise.all(
    users.map(async (user) => {
      files.forEach(async (file) => {
        await shareUser({ fileID: file.id, userID: user.id, role });
      });
    })
  )
    .then(() => {
      store.commit("onSuccess", "success.Share");
    })
    .catch((err) => {
      store.dispatch("onError", err);
    });
}

export async function shareExternalUsers({
  fileID,
  users,
  classification,
  info,
  approvers,
  fileName,
}) {
  try {
    const body = { users, classification, info, approvers, fileName };
    approvers.forEach(async (userID) => {
      await shareUser({ fileID, userID, role: "READ" });
    });
    const res = await Axios.put(`${baseURL}/api/files/${fileID}/permits`, body);
    store.commit("onSuccess", "success.ExternalShare");

    return res.data;
  } catch (err) {
    store.dispatch("onError", err);
  }
}
