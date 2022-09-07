import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const banner = `/*! Nason ${pkg.version} MIT | https://github.com/Simonwep/nason */`;
const production = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.ts',
    plugins: [
        typescript({}),
        (production && terser()),
        replace({
            preventAssignment: true,
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
