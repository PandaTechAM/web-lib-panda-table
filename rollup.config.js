import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import sass from "rollup-plugin-sass"
import postcss from "rollup-plugin-postcss";
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
      terser(),
      postcss({
        preprocessor: (content, id) => new Promise((resolve, reject) => {
          const result = sass.renderSync({ file: id })
          resolve({ code: result.css.toString() })
        }),
        sourceMap: true,
        extract: true,
        extensions: ['.sass','.css']
      })
    ],
    external: ["react", "react-dom", "styled-components", "@emotion/react","@emotion/styled", "@mui/material", "classnames", "react-beautiful-dnd"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts(), postcss({
      preprocessor: (content, id) => new Promise((resolve, reject) => {
        const result = sass.renderSync({ file: id })
        resolve({ code: result.css.toString() })
      }),
      sourceMap: true,
      extract: true,
      extensions: ['.sass','.css']
    })],
  },
];