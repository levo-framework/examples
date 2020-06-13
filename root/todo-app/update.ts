import { Action } from "./action.ts";
import { Model } from "./model.ts";
import { LevoUpdate } from "https://deno.land/x/levo@v0.0.7/mod/levo-update.ts";

export const update: LevoUpdate<Model, Action> = (model, action, event) => {
  switch (action.$) {
    case 'focusItem': {
      return {
        newModel: {
          ...model,
          focusedItemIndex: action.itemIndex
        },
      }
    }
    case 'onFocusItemInputKeyUp': {
      if(event.key === 'Enter') {
      return {
        newModel: {
          ...model,
          focusedItemIndex: undefined,
          items: model.items.map((item, itemIndex) => 
            model.focusedItemIndex === itemIndex
              ? {...item, content: event?.target?.value ?? ''}
              : item
          )
        }
      }
      }
      else {
        return {newModel: model}
      }
    }
    case 'onTopInputKeyUp': {
      if (event?.key === 'Enter') {
        return {
          newModel: {
            ...model,
            newTodoValue: '',
            items: model.newTodoValue.length > 0 ? [
              ...model.items,
              { content: model.newTodoValue, completed: false }
            ] : model.items
          }
        }
      }
      else {
        return {
          newModel: {
            ...model,
            newTodoValue: event?.target?.value ?? ''
          }
        }
      }
    }
    case 'toggleItem': {
      return {
        newModel: {
          ...model,
          items: model.items.map((item, index) => index === action.itemIndex
            ? { ...item, completed: !item.completed }
            : item)
        }
      }
    }
    case 'removeItem': {
      return {
        newModel: {
          ...model,
          items: model.items.filter((_, index) => index !== action.itemIndex)
        }
      }
    }
  }
};
