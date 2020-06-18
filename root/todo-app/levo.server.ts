import { view } from "./view.tsx";
import { Action } from "./action.ts";
import { serve } from "../../../core/mod/levo-serve.ts";
import { Model } from "./model.ts";

serve<Model, Action>({
  getResponse: async (request, response) => {
    const tab = new URLSearchParams(request.search).get("tab");
    return response.page({
      view,
      model: {
        newTodoValue: "",
        items: [],
        tab: tab && ["all", "active", "completed"].includes(tab)
          ? tab as Model["tab"]
          : "all" as const,
      },
    });
  },
});
