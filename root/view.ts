import { Action } from "./action.ts";
import {
  createActions,
  render,
  Levo,
} from "https://deno.land/x/levo@v0.0.11/mod/levo-view.ts";
import { Model } from "./model.ts";

export const view = (model: Model): Levo.Element<Action> => {
  const $ = createActions<Action>();
  return render(
    ["html", { lang: "en" }, [
      ["head", {}, [
        ["meta", { name: "title", content: "My Levo Page" }],
        ["meta", { name: "description", content: "This is a Levo page." }],

        // Open Graph / Facebook
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:url", content: "https://mydomain.com" }],
        ["meta", { property: "og:title", content: "My Levo Page" }],
        ["meta", { property: "og:description", content: "This is a page." }],
        ["meta", { property: "og:image", content: "image.png" }],

        // Open Graph / Twitter
        ["meta", { property: "twitter:card", content: "summary_large_image" }],
        ["meta", { property: "twitter:url", content: "https://mydomain.com" }],
        ["meta", { property: "twitter:title", content: "My Levo Page" }],
        ["meta", { property: "twitter:description", content: "A page" }],
        ["meta", { property: "twitter:image", content: "image.png" }],
        ["title", {}, ["My page"]],

        ["base", { href: "./levo.assets/" }],
        ["link", { rel: "shortcut icon", href: "favicon.ico" }],
        ["link", { rel: "stylesheet", href: "index.css" }],
      ]],
      ["body", {}, [
        ["div", {
          style: {
            display: "grid",
            placeContent: "center",
            placeItems: "center",
            height: "100vh",
            gridGap: "8px",
          },
        }, [
          ["img", {
            src: "favicon.svg",
            alt: "icon",
            style: {
              height: "88px",
              transform: `rotate(${model.rotation}deg)`,
            },
          }],
          ["h1", { style: { color: model.color } }, ["This is a Levo page"]],
          ["button", { onclick: $.rotate() }, ["Rotate"]],
          [
            "button",
            { onclick: $.change_color({ color: "green" }) },
            ["Change to green"],
          ],
          [
            "button",
            { onclick: $.change_color({ color: "black" }) },
            ["Change to black"],
          ],
        ]],
      ]],
    ]],
  );
};
