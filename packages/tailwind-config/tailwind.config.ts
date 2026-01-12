import type { Config } from "tailwindcss";
import defaultThemes from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./modules/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./segments/**/*.{js,ts}",
    "./app.{js,vue,ts}",
    "./error.{js,vue,ts}",
    "../../packages/features/**/*.{js,vue,ts}",
    "!../../packages/features/node_modules/**/*",
    "../../packages/ui/**/*.{js,vue,ts}",
    "!../../packages/ui/node_modules/**/*",
  ],

  plugins: [require("daisyui")],
};

export default config;
