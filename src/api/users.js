import Axios from "axios";
import store from "@/store";
import { formatUser, formatExternalUser } from "@/utils/formatUser";
import { baseURL } from "@/config";
import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";
import i18n from "@/i18n";

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
  const res = await Axios.get(`${baseURL}/api/users/${userID}/approverInfo`, {
    timeout: 500,
  });
  return res.data;
}

/**
 * getUsers returns (Find or search) array of users from the users api.
 * @param {string} content 
 * @param {AdvancedSearchEnum} searchBy 
 */
export async function getUsers(content, searchBy) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { content, searchBy },
    });
    let users = res.data.users.filter((user) => {
        return user.id !== store.state.auth.user.id;
    });
    return Promise.all(users.map(formatUser));
  } catch (err) {
    if (searchBy !== AdvancedSearchEnum.SearchByName) {
      const advancedSearchError = new Error(i18n.t("share.AdvancedSearchError"));
      store.dispatch("onError", advancedSearchError);
    } else {
      store.dispatch("onError", err);
    }
  }
}
