/* eslint-disable no-undef */
/**
 * 构建esm 和 umd 两种模块类型
 */
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    input: `src/index.ts`,
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env"],
      }),
      isProd ? terser() : null,
    ],
    output: {
      file: `dist/index.umd.min.js`,
      format: "umd",
      name: "FettUtils", // 全局对象名称
    },
  },
  {
    input: `src/index.ts`,
    plugins: [esbuild()],
    output: {
      file: `dist/index.esm.js`,
      format: "esm",
    },
  },
  {
    input: `src/index.ts`,
    plugins: [esbuild()],
    output: {
      file: `dist/index.cjs.js`,
      format: "commonjs",
    },
  },
  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
];
