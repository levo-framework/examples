/// <reference lib="dom"/>
import { Action } from "./action.ts";
import { Model } from "./model.ts";
import { LevoInit } from "https://deno.land/x/levo@v0.0.8/mod/levo-init.ts";

export const init: LevoInit<Model, Action> = (model, dispatch) => {
  try {
    const result = window.localStorage.getItem("model");
    if (result) {
      dispatch({ $: "initializeModel", model: JSON.parse(result) });
    }
  } catch {
  }
};
