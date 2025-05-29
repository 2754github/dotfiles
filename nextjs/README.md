# nextjs

```sh
org=2754github
repo=TODO
version=24.0.1
nextjs=15.5.0

mkdir $repo
cd $repo
git init
git remote add origin git@github.com:$org/$repo.git
gcme 'init'

mise use -g node@$version
# https://nextjs.org/docs/getting-started/installation
npx create-next-app@$nextjs .
# All Enter
gaa
gcm "setup with \`npx create-next-app@$nextjs .\` on node@$version"

cp -r $HOME/dotfiles/nextjs/.vscode .
cp -r $HOME/dotfiles/nextjs/memo .memo

mise use node@$version
cp $HOME/dotfiles/nextjs/.npmrc .
npm i -D @types/node@$version
npm i -D @types/react@$(jq -r '.dependencies.react' package.json)
npm i -D @types/react-dom@$(jq -r '.dependencies."react-dom"' package.json)
npm i -D $(jq -r '.devDependencies | to_entries | map(select(.value | test("^[^0-9]"))) | .[].key' package.json | tr '\n' ' ')
npm i -D @tailwindcss/postcss@$(jq -r '.devDependencies.tailwindcss' package.json)
sed -i '' -e 26s"|^|  },\n  \"engines\": {\n    \"node\": \">=$version\"\n|" package.json
gaa
gcm 'setup npm'

cp $HOME/dotfiles/nextjs/next.config.ts .
# https://nextjs.org/docs/app/guides/data-security#preventing-client-side-execution-of-server-only-code
npm install server-only
gaa
gcm 'setup nextjs'

cp -r $HOME/dotfiles/nextjs/linter/ .
npm un @eslint/eslintrc
npm i -D eslint-plugin-better-tailwindcss eslint-plugin-perfectionist eslint-plugin-unicorn knip neostandard prettier
sed -i '' -e 9s'|^|    "type": "next typegen \&\& tsc",\n|' package.json
sed -i '' s'|: "eslint"|: "knip --no-exit-code \&\& prettier --check . \&\& eslint"|' package.json
gaa
gcm 'setup linter'

cp -r $HOME/dotfiles/nextjs/test/ .
npm i -D vitest @vitest/coverage-v8
npm i -D @vitest/coverage-v8@$(jq -r '.devDependencies.vitest' package.json)
sed -i '' -e 10s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 11s'|^|    "test": "vitest run"\n|' package.json
gaa
gcm 'setup test'

rm -fr app
rm -fr public
cp -r $HOME/dotfiles/nextjs/cleanup/ .
echo "# $repo" > README.md
# 🚨 postcss.config.mjsをフォーマット
gaa
gcm 'cleanup'

cp -r $HOME/dotfiles/nextjs/shadcn/ .
sed -i '' -e 27s"|^|      'shadcn/',\n|" eslint.config.mjs
sed -i '' -e 21s'|^|    "paths": {\n      "@/*": ["./shadcn/*"]\n    },\n|' tsconfig.json
# https://ui.shadcn.com/docs/installation/next
npm i -D shadcn
npx shadcn init
# 🚨 app/[lang]/globals.cssをフォーマット
# 🚨 components.jsonをフォーマット
gaa
gcm 'setup shadcn'

# https://supabase.com/docs/guides/local-development
npm install supabase --save-dev
npx supabase init
gaa
gcm 'setup supabase cli'
# https://supabase.com/docs/guides/auth/server-side/nextjs
cp -r $HOME/dotfiles/nextjs/supabase/ .
npm install @supabase/supabase-js @supabase/ssr
sed -i '' -e 35s'|^|!.env.sample\n|' .gitignore
sed -i '' -e  1s'|^|lib/supabase/type.ts\n|' .prettierignore
sed -i '' -e 27s"|^|      'lib/supabase/type.ts',\n|" eslint.config.mjs
gaa
gcm 'setup supabase ssr'

# https://valibot.dev/guides/installation/
cp -r $HOME/dotfiles/nextjs/valibot/ .
npm install valibot
gaa
gcm 'setup valibot (usecase)'

# https://ja.conform.guide/tutorial
cp -r $HOME/dotfiles/nextjs/conform/ .
npm install @conform-to/react @conform-to/valibot --save
sed -i '' -e 190s"|^|      'react/jsx-handler-names': ['error', { eventHandlerPrefix: 'on' }],\n|" eslint.config.mjs
sed -i '' -e 211s"|^|  {\n    files: ['app/**/function.ts'],\n    rules: {\n      'unicorn/prefer-export-from': 'off',\n    },\n  },\n|" eslint.config.mjs
cat << EOS >> lib/lang/index.ts

export const translate = <T extends string>(
  lang: string | undefined,
  message: Record<Lang, T>,
): T => {
  return message[toLang(lang)];
};
EOS
gaa
gcm 'setup conform (form action)'
```
