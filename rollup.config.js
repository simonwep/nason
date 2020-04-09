import {terser} from 'rollup-plugin-terser';
import ts       from '@wessberg/rollup-plugin-ts';
import replace  from '@rollup/plugin-replace';
import pkg      from './package.json';

const banner = `/*! Nason ${pkg.version} MIT | https://github.com/Simonwep/nason */`;

export default {
    input: 'src/index.ts',
    plugins: [
        ts(),
        terser(),
        replace({
            VERSION: JSON.stringify(pkg.version)
        })
    ],
    output: [
        {
            banner,
            file: pkg.main,
            name: 'Nason',
            format: 'umd',
            sourcemap: true
        },
        {
            banner,
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ]
};
