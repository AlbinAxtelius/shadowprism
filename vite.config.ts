import { resolve } from "path"
import { defineConfig } from "vite"
import { VitePluginNode } from "vite-plugin-node"

const createAlias = (alias: string, path: string) => ({
  [alias]: resolve(__dirname, path),
})

const createAliases = (aliases: [string, string][]) => {
  return aliases.reduce((acc, [alias, path]) => {
    return { ...acc, ...createAlias(alias, path) }
  }, {})
}

export default defineConfig({
  server: {
    port: 3000,
  },
  envDir: ".env",
  envPrefix: "API_",
  resolve: {
    alias: createAliases([
      ["@app/prisma", "./prisma"],
      ["@app/utils", "./src/utils"],
      ["@app/types", "./src/types"],
      ["@app/routes", "./src/routes"],
      ["@app/middleware", "./src/middleware"],
      ["@app/controllers", "./src/controllers"],
      ["@app/models", "./src/models"],
      ["@app/services", "./src/services"],
    ]),
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
      exportName: "default",
    }),
  ],
})
