import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import url from 'rollup-plugin-url';
import svg from 'rollup-plugin-svg';
import json from 'rollup-plugin-json';
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      url({
        include: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.svg', '**/*.json'],
        emitFiles: true,
        limit: Infinity,
      }),
      svg(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/, /\.scss$/, /\.woff$/, /\.woff2$/, /\.eot$/, /\.ttf$/, /\.svg$/, /\.json$/],
  },
];