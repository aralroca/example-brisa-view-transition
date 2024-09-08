import type { Configuration } from "brisa";

export default {
  // If you want to use Brisa's as static site generator, you can set
  // the output to "static" (default: "bun").
  // Also "node", "desktop", "android" and "ios" are available.
  output: "bun",
} satisfies Configuration;
