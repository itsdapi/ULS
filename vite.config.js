import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/main.ts',
            fileName: 'index',
            formats: ['cjs'], // Changed from 'es' to 'cjs' for CommonJS output
        },
        rollupOptions: {
            // Make sure external dependencies are not bundled
            external: ['xmlhttprequest'],
            output: {
                // Set proper exports for CommonJS
                exports: 'named'
            }
        }
    },
});