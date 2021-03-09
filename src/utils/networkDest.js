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
