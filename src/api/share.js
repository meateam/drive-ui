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
    const users = [];
    const res = await Axios.get(`${baseURL}/api/transfersInfo?all=true`, {
      headers: { fileID },
    });

    if (res.data) {
      res.data.map((transferInfo) => {
        let isFailed = true;

        if (store.getters.statusSuccessType === transferInfo.status[transferInfo.status.length - 1].type) {
          isFailed = false;
        }

        transferInfo.to.map((destUser) => {
          destUser.isFailed = isFailed;
          destUser.createdAt = transferInfo.createdAt;
          users.push(destUser);
        });
      });
    }

    return users;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * getExternalTransfers returns all the transfer that the user has made
 */
export async function getExternalTransfers() {
  try {
    let transfers = [];
    const res = await Axios.get(`${baseURL}/api/transfersInfo`);

    if (res.data) {
      transfers = res.data;
    }

    return transfers;
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
  await Axios.delete(`${baseURL}/api/files/${fileID}/permissions?userId=${userID}`)
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

/**
 * shareExternalUsers share external users
 * @param fileID is the file to share
 * @param users is the list of the users to share
 * @param classification file level
 * @param info information that the user enter about the file
 * @param approvers the users that approve the external share
 * @param fileName the fileName to share
 * @param destination the external network to share
 * @param ownerID
 */
export async function shareExternalUsers({
  fileID,
  users,
  classification,
  info,
  approvers,
  fileName,
  destination,
  ownerID,
}) {
  try {
    const body = { users, classification, info, approvers, fileName, destination, ownerID };
    approvers.forEach(async (userID) => {
      await shareUser({ fileID, userID, role: "READ" });
    });
    const res = await Axios.put(`${baseURL}/api/files/${fileID}/transfer`, body);
    store.commit("onSuccess", "success.ExternalShare");

    return res.data;
  } catch (err) {
    store.dispatch("onError", err);
  }
}
