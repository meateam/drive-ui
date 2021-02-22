import Axios from "axios";
import store from "@/store";
import { formatUser, formatExternalUser } from "@/utils/formatUser";
import { baseURL } from "@/config";
import { AdvancedSearchFlags } from "@/utils/advancedSearchFlags";
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
  const res = await Axios.get(`${baseURL}/api/users/${userID}/approverInfo`, {
    timeout: 500,
  });
  return res.data;
}

export async function getUsers(content, flag) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { partial: content, searchBy: flag },
      timeout: 3000,
    });
    let users = [];
    if (res.data.users) {
      users = res.data.users.filter((user) => {
        return user.id !== store.state.auth.user.id;
      });
    } else if (res.data.user) {
      users = [res.data.user];
    }
    return Promise.all(users.map((user) => formatUser(user)));
  } catch (err) {
    if (flag !== AdvancedSearchFlags.SearchByNameFlag) {
      const advancedSearchError = new Error(i18n.t("share.AdvancedSearchError"));
      store.dispatch("onError", advancedSearchError);
    } else {
      store.dispatch("onError", err);
    }
  }
}
