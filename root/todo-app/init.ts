/// <reference lib="dom"/>
import { Action } from "./action.ts";
import { Model } from "./model.ts";
import { LevoInit } from "../../../core/mod/levo-init.ts";

export const init: LevoInit<Model, Action> = (model, dispatch) => {
  try {
    const result = window.localStorage.getItem("items");
    if (result) {
      dispatch({ $: "initializeItems", items: JSON.parse(result) });
    }
  } catch {
  }
};
