import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import stripBanner from 'rollup-plugin-strip-banner';
import pkg from './package.json' assert { type: "json" };


const year = new Date().getFullYear();

function getBanner() {
    return `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * Copyright 2024-${year} ${pkg.author}
 * license ${pkg.license}
 */\n`;
}

const plugins = [
    resolve(),
    commonjs(),
    stripBanner({
        include: '**/*.js',
        exclude: 'node_modules/**'
    }),
    babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
    }),
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(terser({
        output: {
            comments() {
                return false
            }
        }
    }))
}



const config = [];



let file = pkg.main
if (process.env.NODE_ENV === 'production') {
    file = file.replace(/\.js$/, '.min.js')
}


const base = {
    banner: getBanner(),
    sourcemap: true,//方便调试
}

const input = 'src/index.js'

config.push({
    input,
    output: {
        ...base,
        format: 'umd',
        name: 'Delegateify',
        file
    },
    plugins
})


file = pkg.module;
if (process.env.NODE_ENV === 'production') {
    file = file.replace(/\.js$/, '.min.js')
}


config.push({
    input,
    output: {
        ...base,
        file,
        format: 'esm'
    },
    plugins
})


export default config;
