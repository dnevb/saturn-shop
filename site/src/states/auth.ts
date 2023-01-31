import { atom } from "recoil";
import { localStorageEffect } from "./effects";

export const authState = atom<{ user: any; token: string } | null>({
  key: "authState",
  default: null,
  effects: [localStorageEffect("auth_state")],
});
