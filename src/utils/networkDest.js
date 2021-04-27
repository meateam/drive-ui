import store from "@/store";

export function getNetworkItemByDest(destination) {
  const networkDest = store.state.configuration.externalNetworkDests.filter(
    (networkDest) => networkDest.value == destination
  )[0];
  return networkDest;
}

export function getNetworkItemByAppId(appId) {
  const networkDest = store.state.configuration.externalNetworkDests.filter(
    (networkDest) => networkDest.appID == appId
  )[0];
  return networkDest;
}

export function getEnabledNetworks() {
  // Check if network enabled
  let networkDests = store.state.configuration.externalNetworkDests.filter((networkDest) => networkDest.isEnabled);

  // Check if network has limit to approvers only
  networkDests = networkDests.filter(
    (networkDest) =>
      !networkDest.isOnlyApprover ||
      (networkDest.isOnlyApprover &&
        (store.state.auth.user.approverInfos[networkDest.value].isApprover ||
          store.state.auth.user.approverInfos[networkDest.value].isAdmin))
  );
  return networkDests;
}
