import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        globals: true,
        deps: {
            inline: ["clsx"],
        },
    },
    server: {
        port: 1337,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
        mainFields: ["module"],
    },
})
