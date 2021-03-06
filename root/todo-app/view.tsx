import { Action } from "./action.ts";
import {
  Levo,
} from "../../../core/mod/levo-view.ts";
import { Model } from "./model.ts";

export const view = (
  model: Model,
  dispatch: Levo.Dispatch<Action>,
): Levo.Element => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Levo • TodoMVC</title>
        <link rel="stylesheet" href="todo-app/levo.assets/index.css"></link>
      </head>
      <body>
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input
              class="new-todo"
              placeholder="What needs to be done?"
              autofocus="true"
              value={model.newTodoValue}
              onkeyup={dispatch({ $: "onTopInputKeyUp" })}
            />
          </header>
          <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
              {model.items.flatMap((item, itemIndex) =>
                !(model.tab === "all"
                  ? true
                  : model.tab === "active"
                  ? !item.completed
                  : item.completed)
                  ? []
                  : [
                    <li
                      class={[
                        item.completed ? "completed" : "",
                        model.focusedItemIndex === itemIndex ? "editing" : "",
                      ].join(" ")}
                    >
                      <div
                        class="view"
                        ondblclick={dispatch({ $: "focusItem", itemIndex })}
                      >
                        <input
                          class="toggle"
                          type="checkbox"
                          checked={item.completed ? "true" : undefined}
                          onclick={dispatch({ $: "toggleItem", itemIndex })}
                        />
                        <label>{item.content}</label>
                        <button
                          class="destroy"
                          onclick={dispatch({ $: "removeItem", itemIndex })}
                        >
                        </button>
                      </div>
                      <input
                        class="edit"
                        value={item.content}
                        onkeyup={dispatch({ $: "onFocusItemInputKeyUp" })}
                      />
                    </li>,
                  ]
              )}
            </ul>
            <footer class="footer">
              <span class="todo-count">
                <strong>
                  {model.items.length} item{model.items.length > 0 ? "s" : ""}
                  left
                </strong>
              </span>
              <ul class="filters">
                <li>
                  <a
                    class={model.tab === "all" ? "selected" : undefined}
                    href="todo-app?tab=all"
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    class={model.tab === "active" ? "selected" : undefined}
                    href="todo-app?tab=active"
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    class={model.tab === "completed" ? "selected" : undefined}
                    href="todo-app?tab=completed"
                  >
                    Completed
                  </a>
                </li>
              </ul>
            </footer>
          </section>
        </section>
      </body>
    </html>
  );
};
