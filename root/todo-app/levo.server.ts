import { view } from "./view.ts";
import { Action } from "./action.ts";
import { serve } from "https://deno.land/x/levo@v0.0.11/mod/levo-serve.ts";
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
