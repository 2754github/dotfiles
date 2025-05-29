# nextjs

```sh
org=2754github
repo=TODO
version=22.0.0

mkdir $repo
cd $repo
git init
git remote add origin git@github.com:$org/$repo.git
gcme 'init'

mise use -g node@$version
# https://nextjs.org/docs/getting-started/installation
npx create-next-app@latest .
# All Enter
gaa
gcm "\`npx create-next-app@latest .\` in node@$version"

mise use node@$version
cp $HOME/dotfiles/nextjs/.npmrc .
sed -i '' -e 26s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 27s"|^|  \"engines\": {\\n    \"node\": \">=$version\"\\n  }\n|" package.json
npm i react react-dom
npm i -D \
  @eslint/eslintrc@latest \
  @tailwindcss/postcss@latest \
  @types/node@$version \
  @types/react@latest \
  @types/react-dom@latest \
  eslint@latest \
  tailwindcss@latest \
  typescript@latest
gaa
gcm 'setup npm'

cp $HOME/dotfiles/nextjs/next.config.ts .
# https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#:~:text=npm%20install%20server%2Donly
npm install server-only
gaa
gcm 'setup nextjs'

cp $HOME/dotfiles/nextjs/tsconfig.json .
gaa
gcm 'setup typescript'

# 自分は.vscodeのコピー不要

cp -r $HOME/dotfiles/nextjs/linter/ .
npm un @eslint/eslintrc
npm i -D eslint-plugin-perfectionist eslint-plugin-unicorn knip neostandard prettier
sed -i '' -e  6s'|^|    "prebuild": "scripts/lint",\n|' package.json
sed -i '' -e  7s'|^|    "build": "next build",\n|' package.json
sed -i '' -e  9d package.json
sed -i '' -e  9s'|^|    "lint": "scripts/lint",\n|' package.json
sed -i '' -e 11d package.json
sed -i '' -e 10s'|,$||' package.json
gaa
gcm 'setup linter'

# "lint": "knip --no-exit-code && prettier --check . && next lint",

# https://github.com/vercel/next.js/issues/60038#issuecomment-1876273967
cp -r $HOME/dotfiles/nextjs/test/ .
npm i -D vitest
sed -i '' -e  6s'|scripts/lint|scripts/lint \&\& vitest run|' package.json
sed -i '' -e 10s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 11s'|^|    "test": "vitest run"\n|' package.json
gaa
gcm 'setup test'

# https://ui.shadcn.com/docs/installation/next
npm i -D shadcn
# package.json "shadcn": "shadcn"
npm run shadcn init
# knip.json, .prettierignore

# コンポーネント追加時は
# npm run shadcn add button
# Use --force

# tsconfigは下記がうまくいきそう
# "paths": {
#   "@/*": ["./shadcn/*"]
# }
```
