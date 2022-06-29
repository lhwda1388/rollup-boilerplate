import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

export default {
  input: './src/index.ts', // 진입
  output: {
    file: './dist/bundle.js', // 출력
    format: 'es', // 출력형식
    sourcemap: true,
  },
  plugins: [
    // 바벨 트랜스파일러 설정
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    // node_modules 내 서드파티 모듈 사용
    nodeResolve(),
    // cjd 디펜던시 es 방식으로 변환해서 빌드 결과물에 포함가능하게 해줌
    commonjs(),
    // json파일을 빌드 결과물에 포함
    json(),
    // 파일을 빌드 결과물에 포함
    url(),
    // 스트링 변환, 환경변수 등 사용
    replace({
      __buildDate__: () => JSON.stringify(new Date()),
    }),
  ],
};
