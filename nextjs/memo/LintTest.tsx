// @ts-nocheck
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState, type FC } from 'react';

// "editor.codeActionsOnSave" の "source.fixAll.eslint": "explicit" をコメントアウトしておく。

/**
 * ケツセミコロンを付与すべき。
 * https://prettier.io/docs/en/options.html#semicolons
 */

/**
 * ケツカンマを付与すべき。
 * https://prettier.io/docs/en/options.html#trailing-commas
 */

/**
 * ブロックの省略は避けるべき。
 * https://eslint.org/docs/v8.x/rules/arrow-body-style
 * https://eslint.org/docs/v8.x/rules/curly
 */
const abs = () => 0;
let curly = 0;
if (curly === 0) curly++;

/**
 * function, new, as の使用は避けるべき。
 * https://eslint.org/docs/v8.x/rules/no-restricted-syntax
 *
 * AST selector checker: https://typescript-eslint.io/play/
 * What syntax can selectors have?: https://eslint.org/docs/v8.x/extend/selectors#what-syntax-can-selectors-have
 */
function nrs() {
  const d = new Date();
  const e = new Error();
  const is = new Intl.Segmenter();
  const m = new Map();
  const p = new Promise((r) => {
    r('');
  });
  const s = new Set();
  const u = new URL('');
  const us = new URLSearchParams();

  const config = {} as const;
  const zero = 0 as number;
}

/**
 * オブジェクトは改行すべき。
 * https://eslint.org/docs/v8.x/rules/object-curly-newline
 *
 * 下記と競合するため、諦める。
 * https://prettier.io/docs/en/options.html#print-width
 */
// const ocn = { a: 1, b: 2 };

/**
 * 適宜、改行すべき。
 * https://eslint.org/docs/v8.x/rules/padding-line-between-statements
 */
export const pl = 1;
export const bs = 2;

/**
 * 分割代入を使用すべき。
 * https://eslint.org/docs/v8.x/rules/prefer-destructuring
 * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
 */
// 配列
const pda = [1, 2];
const pda1 = pda[0];

// オブジェクト
const pdo = { a: 1, b: 2 };
const pdoa1 = pdo['a'];
const pdoa2 = pdo.a;
const pdoc = pdo.a;

// コンポーネント
type Props = { id: string };
const BadDa: FC<Props> = (props) => {
  return <div id={props.id} />;
};

const BetterDa: FC<Props> = (props) => {
  const { id } = props;

  return <div id={id} />;
};

const BestDa: FC<Props> = ({ id }) => {
  return <div id={id} />;
};

/**
 * コンポーネント定義にはアロー関数を使用すべき。
 * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
 */
function WorstFcd() {
  return <div />;
}

const BadFcd = function () {
  return <div />;
};

const BestFcd = () => {
  return <div />;
};

/**
 * HTML 属性はソートすべき。
 * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
 */
<button
  onClick={undefined}
  disabled
  type="button"
  className="class"
  ref={undefined}
  key="key"
>
  強い気持ち
</button>;

/**
 * switch が適している場面で else if の使用は避けるべき。
 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
 */
type BloodType = 'A' | 'B' | 'O' | 'AB';
declare const bt: BloodType;
if (bt === 'A') {
  //
} else if (bt === 'B') {
  //
} else {
  //
}

/**
 * type に統一すべき。
 * https://typescript-eslint.io/rules/consistent-type-definitions/
 */
type Tprops = {
  id: string;
};
interface Iprops {
  id: string;
}

/**
 * async/await は過不足なく付与すべき。
 * https://typescript-eslint.io/rules/require-await/
 * https://typescript-eslint.io/rules/no-floating-promises/
 */
// 過剰
const badRa = async () => {
  return 1;
};

// 不足
new Promise((resolve) => {
  setTimeout(resolve, 1000);
});

// IIFE の場合は怒られないように設定。
(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
})();

/**
 * async/await のやりがちなミスを防ぐ。
 * https://typescript-eslint.io/rules/no-misused-promises/
 */
[].forEach(async (x) => {
  await new Promise((resolve) => {
    setTimeout(resolve, x * 1000);
  });
});

// ハンドラーの場合は怒られないように設定。
<button type="submit" onClick={badRa} />;

/**
 * 明示的に存在チェックを行うべき。
 * https://typescript-eslint.io/rules/strict-boolean-expressions/
 */
let sben: number | null | undefined;
if (sben) {
  sben;
}

let sbes: string | null | undefined;
if (!sbes) {
  sbes;
}

let sbeo: object | null | undefined;
if (sbeo) {
  sbeo;
}

/**
 * ------------------------------------------------------------------------------------------------
 * 以降は @vercel/style-guide から継承されたルール
 */

// https://eslint.org/docs/v8.x/rules/eqeqeq
let eqeqeq = 0;
if (eqeqeq == 0) {
  eqeqeq++;
}

// https://eslint.org/docs/v8.x/rules/no-console
console.log('');

// https://eslint.org/docs/v8.x/rules/no-var
var nv = 0;
nv++;

// https://eslint.org/docs/v8.x/rules/prefer-const
let pc = undefined;

// https://typescript-eslint.io/rules/no-non-null-assertion/
pc!;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
<button>type なし</button>;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
[].map(() => {
  return <div />;
});

/**
 * ----------------------------------------------------------------------------
 * チームで同じような React コンポーネントを書く
 * https://zenn.dev/kazukix/articles/create-similar-react-components
 */

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
const Hus = () => {
  const [count, updateCount] = useState(0);

  return <div />;
};

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
<input checked={true} type="checkbox" />;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
<Fragment>
  <div />
</Fragment>;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
<button type={'button'}>{'中括弧不要'}</button>;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
<div></div>;

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
const J_p_c = () => {
  return <div />;
};
<J_p_c />;

/**
 * ----------------------------------------------------------------------------
 * ESLint を使い倒す（おすすめルール紹介）
 * https://zenn.dev/noshiro_piko/articles/take-full-advantage-of-typescript-eslint
 */

// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
const Jnlr = () => {
  const zero = 0 as number;
  const nan = NaN;

  return (
    <>
      {zero && <div />}
      {nan && <div />}
    </>
  );
};

// https://eslint.org/docs/v8.x/rules/no-implicit-coercion
const nic = '0';
+nic;

// https://typescript-eslint.io/rules/restrict-plus-operands/
nic + 0;

// https://eslint.org/docs/v8.x/rules/prefer-template
nic + '0';

// https://typescript-eslint.io/rules/switch-exhaustiveness-check/
switch (bt) {
  case 'A':
    break;
}

// https://typescript-eslint.io/rules/require-array-sort-compare/
[].sort();

// https://react.dev/reference/rules/rules-of-hooks
const Roh = () => {
  try {
    const [x, setX] = useState(0);
  } catch {
    const [x, setX] = useState(1);
  }

  return <div />;
};

/**
 * ----------------------------------------------------------------------------
 * ESLint で学ぶ TypeScript
 * https://zenn.dev/metalmental/articles/20241019_study-with-eslint
 *
 * のパターンは上記でケア済み。
 */
