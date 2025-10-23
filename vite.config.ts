import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

console.log("✅ vite.config.js geladen – met sveltekit-plugin");

export default defineConfig({
  plugins: [sveltekit()]
});