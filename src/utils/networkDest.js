import store from "@/store";

export function getNetworkItemByDest(destination) {
  const networkDest = store.state.configuration.externalNetworkDests.find(
    (networkDest) => networkDest.value == destination
  );
  return networkDest;
}

export function getNetworkItemByAppId(appId) {
  const networkDest = store.state.configuration.externalNetworkDests.find(
    (networkDest) => networkDest.appID == appId
  );
  return networkDest;
}

export function getEnabledNetworks() {
  let networkDests;
  try {
    // Check if network enabled
    networkDests = store.state.configuration.externalNetworkDests.filter((networkDest) => networkDest.isEnabled);
  } catch (_err) {
    networkDests = [];
  }

  // Check if network has limit to approvers only
  networkDests = networkDests.filter(
    (networkDest) =>
    {
      try {
        return !networkDest.isOnlyApprover ||
        (networkDest.isOnlyApprover &&
          (store.state.auth.user.approverInfos[networkDest.value].isApprover ||
            store.state.auth.user.approverInfos[networkDest.value].isAdmin))
      } catch (_err) {
        return false;
      }
    });
  return networkDests;
}
