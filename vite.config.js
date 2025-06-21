import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react()
    ],

    server: {
        host: '0.0.0.0',
        port: 5173,
        cors: {
            origin: [
                'http://192.168.0.33:8000',
                'http://localhost:8000',
                'http://127.0.0.1:8000'
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            credentials: true
        },
        hmr: {
            host: '192.168.0.33',
            port: 5173,
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
        },
    },
});
