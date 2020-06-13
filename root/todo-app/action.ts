import { Model } from "./model.ts";

export type Action =
  | {
    $: "changeTab";
    to: Model["tab"];
  }
  | {
    $: "initializeModel";
    model: Model;
  }
  | {
    $: "onTopInputKeyUp";
  }
  | {
    $: "onFocusItemInputKeyUp";
  }
  | {
    $: "toggleItem";
    itemIndex: number;
  }
  | {
    $: "removeItem";
    itemIndex: number;
  }
  | {
    $: "focusItem";
    itemIndex: number;
  };
