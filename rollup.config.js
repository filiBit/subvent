import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/iife/subvent.js',
      format: 'iife',
      extend: true,
      name: 'window',
      compact: true,
      plugins: [terser()]
    },
    {
      file: 'dist/cjs/subvent.js',
      format: 'cjs',
      compact: true,
      plugins: [terser()]
    },
    {
      file: 'dist/esm/subvent.js',
      format: 'es',
      compact: true,
      plugins: [terser()]
    }
  ]
}
