import { defineConfig } from 'vite'
import * as path from 'path'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'
import VueMacros from 'unplugin-vue-macros/vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        DefineOptions(),
        VueMacros({
            plugins: {
                vue: vue(),
            },
        }),
        dts({
            insertTypesEntry: true,
        }),
        typescript2({
            check: false,
            include: ['src/components/**/*.vue'],
            tsconfigOverride: {
                compilerOptions: {
                    outDir: 'dist',
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
            },
            exclude: ['vite.config.ts'],
        }),
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: 'src/gc-ui.ts',
            name: 'gc-ui',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => `gc-ui.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            input: {
                main: path.resolve(__dirname, 'src/gc-ui.ts'),
            },
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
