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
    store.commit("addUserToictionary", user);

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
 * @param destination external destination network
 */
export async function getExternalUserByID(userID, destination) {
  try {
    const res = await Axios.get(`${baseURL}/api/users/${userID}`, {
      headers: { 'destination': destination }
    });
    const user = formatExternalUser(res.data.user);
    return user;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * getUsersByIDs returns the array of the users with the id
 * @param userIDs is the array of the ids
 * @param destination external destination network
 */
export function getExternalUsersByIDs(userIDs, destination) {
  return Promise.all(
    userIDs.map((id) => {
      return getExternalUserByID(id, destination);
    })
  );
}

/**
 * searchExternalUsersByName sets the current users to the external users with the received name
 * @param name
 * @param destination external destination network
 */
export async function searchExternalUsersByName(name, destination) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { partial: name },
      headers: { 'destination': destination }
    });
    const users = res.data.users || [];
    return Promise.all(users.map((user) => formatExternalUser(user)));
  } catch (err) {
    store.dispatch("onError", err);
  }
}

export async function getApproverInfo(userID) {
  const res = await Axios.get(`${baseURL}/api/users/${userID}/approverInfo`);

  const approverInfo = res.data.approverInfo;

  if (approverInfo.unit.name === "noUnit" && !approverInfo.isAdmin) approverInfo.noUnit = true;

  return res.data.approverInfo;
}

export async function canBeApproved(userID, approverID) {
  const res = await Axios.get(`${baseURL}/api/users/${userID}/canApproveToUser/${approverID}`);

  return res.data;
}

export function openAboutMePage() {
  window.open(`${store.state.configuration.approvalServiceUrl}/myAccount`);
}
