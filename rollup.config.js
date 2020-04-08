import {terser}   from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg        from './package.json';

const input = 'src/index.ts';

export default [
    {
        input,
        output: {
            file: pkg.main,
            name: 'Nason',
            format: 'umd',
            sourcemap: true
        },
        plugins: [
            typescript(),
            terser()
        ]
    },
    {
        input,
        output: {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        },
        plugins: [
            typescript(),
            terser()
        ]
    }
];
