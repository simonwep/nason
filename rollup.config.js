import {terser}   from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import replace    from '@rollup/plugin-replace';
import pkg        from './package.json';

const input = 'src/index.ts';
const banner = `/*! Nason ${pkg.version} MIT | https://github.com/Simonwep/nason */`;
const plugins = [
    typescript(),
    terser(),
    replace({
        VERSION: JSON.stringify(pkg.version)
    })
];

export default [
    {
        input,
        plugins,
        output: {
            banner,
            file: pkg.main,
            name: 'Nason',
            format: 'umd',
            sourcemap: true
        }
    },
    {
        input,
        plugins,
        output: {
            banner,
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    }
];
