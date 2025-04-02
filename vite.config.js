// vite.config.js
import {
    defineConfig
} from 'vite';
import tailwindcss from '@tailwindcss/vite'; // Import the Tailwind plugin

export default defineConfig({
    root: ".",
    plugins: [
        tailwindcss() // Add the Tailwind plugin here
    ],
});