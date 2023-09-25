import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // @ts-ignore
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        globals: true,
        deps: {
            inline: ["clsx"],
        },
    },
    server: {
        port: 4280,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
        mainFields: ["module"],
    },
    assetsInclude: ["**/*.md"],
})
