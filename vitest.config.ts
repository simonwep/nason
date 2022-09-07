import {defineConfig} from 'vitest/config';

export default defineConfig({
    define: {
        VERSION: JSON.stringify('0.0.0-test')
    }
});
