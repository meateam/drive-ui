import Axios from "axios";
import store from "@/store";
import { formatUser } from "@/utils/formatUser";
import { baseURL } from "@/config";
import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";
import i18n from "@/i18n";
import { getNetworkItemByDest } from "@/utils/networkDest";

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
 * @param destination external destination network
 */
export async function getExternalUserByID(userID, destination) {
  try {
    const res = await Axios.get(`${baseURL}/api/users/${userID}`, {
      headers: { destination: destination },
    });
    const user = formatUser(res.data.user, true);
    store.commit("addUserToictionary", user);

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
      params: { content: name, searchBy: AdvancedSearchEnum.SearchByName },
      headers: { destination: destination },
    });
    const users = res.data.users || [];
    return Promise.all(users.map((user) => formatUser(user, true)));
  } catch (err) {
    store.dispatch("onError", err);
  }
}

export async function getApproverInfo(userID, destination) {
  const res = await Axios.get(`${baseURL}/api/users/${userID}/approverInfo`, {
    headers: { destination },
    timeout: 5000,
  });

  const approverInfo = res.data;

  if (approverInfo.unit.name === "noUnit" && !approverInfo.isAdmin) approverInfo.noUnit = true;

  return approverInfo;
}

export async function canBeApproved(userID, approverID, destination) {
  const res = await Axios.get(`${baseURL}/api/users/${userID}/canApproveToUser/${approverID}`, {
    headers: { destination: destination },
  });

  return res.data;
}

/**
 * getUsers returns (Find or search) array of users from the users api.
 * @param {string} content
 * @param {AdvancedSearchEnum} searchBy
 */
export async function getUsers(content, searchBy, destination = "") {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { content, searchBy },
      headers: { destination },
    });
    let users = res.data.users
      ? res.data.users.filter((user) => {
          return user.id !== store.state.auth.user.id;
        })
      : [];
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

export function openApprovalPage(destination) {
  const networkDest = getNetworkItemByDest(destination);
  window.open(`${networkDest.approvalUIUrl}`);
}

export function openAboutMePage(destination) {
  const networkDest = getNetworkItemByDest(destination);
  window.open(`${networkDest.approvalUIUrl}/myAccount`);
}
