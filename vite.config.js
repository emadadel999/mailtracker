import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // mkcert(),
        // libInjectCss()
    ],
    // build: {
    //     lib: {
    //         // src/indext.js is where we have exported the component(s)
    //         entry: resolve(__dirname, "src/lib/index.js"),
    //         name: "mail-tracker",
    //         // the name of the output files when the build is run
    //         fileName: "mail-tracker",
    //     },
    //     rollupOptions: {
    //         // make sure to externalize deps that shouldn't be bundled
    //         // into your library
    //         external: ["react", "react-dom"],
    //         output: {
    //             // Provide global variables to use in the UMD build
    //             // for externalized deps
    //             globals: {
    //                 react: "React",
    //                 "react-dom": "React-dom",
    //             },
    //         }
    //     },
    // },
})
