import { LevoApp } from "https://deno.land/x/levo@v0.0.9/mod/levo-app.ts";

const production = Deno.args.includes("--production");
LevoApp.start({
  port: 5000,
  minifyJs: production,
  cachePages: production,
  rootDir: new URL("./root", import.meta.url),
});
