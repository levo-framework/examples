/// <reference lib="dom"/>
import { Action } from "./action.ts";
import { Model } from "./model.ts";
import { Levo } from "../../../core/mod/levo-view.ts";

export const update: Levo.Update<Model, Action> = (model, action, event) => {
  const { newModel, then } = update$(model, action, event);
  if (action.$ !== "initializeItems") {
    window.localStorage.setItem("items", JSON.stringify(newModel.items));
  }
  return { newModel, then };
};

const update$: Levo.Update<Model, Action> = (model, action, event) => {
  switch (action.$) {
    case "initializeItems": {
      return {
        newModel: {
          ...model,
          items: action.items,
        },
      };
    }
    case "focusItem": {
      return {
        newModel: {
          ...model,
          focusedItemIndex: action.itemIndex,
        },
      };
    }
    case "onFocusItemInputKeyUp": {
      console.log(event);
      if ((event as any).key === "Enter") {
        return {
          newModel: {
            ...model,
            focusedItemIndex: undefined,
            items: model.items.map((item, itemIndex) =>
              model.focusedItemIndex === itemIndex
                ? { ...item, content: (event as any)?.target?.value ?? "" }
                : item
            ),
          },
        };
      } else {
        return { newModel: model };
      }
    }
    case "onTopInputKeyUp": {
      if ((event as any)?.key === "Enter") {
        return {
          newModel: {
            ...model,
            newTodoValue: "",
            items: model.newTodoValue.length > 0
              ? [
                ...model.items,
                { content: model.newTodoValue, completed: false },
              ]
              : model.items,
          },
        };
      } else {
        return {
          newModel: {
            ...model,
            newTodoValue: (event as any)?.target?.value ?? "",
          },
        };
      }
    }
    case "toggleItem": {
      return {
        newModel: {
          ...model,
          items: model.items.map((item, index) =>
            index === action.itemIndex
              ? { ...item, completed: !item.completed }
              : item
          ),
        },
      };
    }
    case "removeItem": {
      return {
        newModel: {
          ...model,
          items: model.items.filter((_, index) => index !== action.itemIndex),
        },
      };
    }
  }
};
