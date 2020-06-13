import { serve } from "https://deno.land/x/levo@v0.0.8/mod/levo-serve.ts";

serve({
  getResponse: async (request, response) => {
    return response.custom({
      body: `
User-agent: *
Allow: /
      `.trim(),
    });
  },
});
