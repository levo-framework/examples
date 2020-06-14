import { Model } from "./model.ts";

export type Action =
  | {
    $: "initializeItems";
    items: Model["items"];
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
