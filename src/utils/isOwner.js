import store from "@/store";

export function isOwner(ownerId) {
  return ownerId === store.state.auth.user.id;
}
