import Axios from "axios";
import store from "@/store";
import { formatUser, formatExternalUser } from "@/utils/formatUser";
import { baseURL } from "@/config";

/**
 * getUserByID returns the user with the received id
 * @param userID is the user id
 */
export async function getUserByID(userID) {
  try {
    const res = await Axios.get(`${baseURL}/api/users/${userID}`);
    const user = formatUser(res.data.user);
    return user;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * getUsersByIDs returns the array of the users with the id
 * @param userIDs is the array of the idws
 */
export function getUsersByIDs(userIDs) {
  return Promise.all(
    userIDs.map((id) => {
      return getUserByID(id);
    })
  );
}

/**
 * searchUsersByName gets all the users with the received name
 * @param name is the name of the users
 */
export async function searchUsersByName(name) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { partial: name },
    });
    const users = res.data.users
      ? res.data.users.filter((user) => {
          return user.id !== store.state.auth.user.id;
        })
      : [];
    return Promise.all(users.map((user) => formatUser(user)));
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * getExternalUserByID returns the external user with the received id
 * @param userID is the user id
 */
export async function getExternalUserByID(userID) {
  try {
    const res = await Axios.get(`${baseURL}/api/delegators/${userID}`);
    const user = formatExternalUser(res.data.user);
    return user;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * getUsersByIDs returns the array of the users with the id
 * @param userIDs is the array of the ids
 */
export function getExternalUsersByIDs(userIDs) {
  return Promise.all(
    userIDs.map((id) => {
      return getExternalUserByID(id);
    })
  );
}

/**
 * searchExternalUsersByName sets the current users to the external users with the received name
 * @param name
 */
export async function searchExternalUsersByName(name) {
  try {
    const res = await Axios.get(`${baseURL}/api/delegators`, {
      params: { partial: name },
    });
    const users = res.data.users || [];
    return Promise.all(users.map((user) => formatExternalUser(user)));
  } catch (err) {
    store.dispatch("onError", err);
  }
}

export async function getApproverInfo(userID) {
  try {
    const res = await Axios.get(`${baseURL}/api/users/${userID}/approverInfo`);
    return res.data;
  } catch (err) {
    return {
      canApprove: false,
    };
  }
}
