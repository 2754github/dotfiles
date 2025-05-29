```sh
org=2754github
repo=TODO
version=22.0.0

mkdir $repo
cd $repo
git init
git remote add origin git@github.com:$org/$repo.git

mise use -g node@$version
# https://nextjs.org/docs/getting-started/installation
npx create-next-app@15.1.6 .
# All Enter
gaa
gcm "\`create-next-app@15.1.6 .\` in node@$version"

mise use node@$version
cp $HOME/dotfiles/nextjs/.npmrc .
sed -i '' -e 26s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 27s"|^|  \"engines\": {\\n    \"node\": \">=$version\"\\n  }\n|" package.json
npm i react react-dom
npm i -D @eslint/eslintrc @types/node @types/react @types/react-dom eslint eslint-config-next postcss tailwindcss typescript
gaa
gcm 'setup npm'

cp $HOME/dotfiles/nextjs/next.config.ts .
# https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#:~:text=npm%20install%20server%2Donly
npm install server-only
gaa
gcm 'setup nextjs'

cp $HOME/dotfiles/nextjs/tsconfig.json .
# Do not use flat config.
npm un @eslint/eslintrc eslint
npm i -D eslint@8.57.1
npm i -D @vercel/style-guide@6.0.0
gaa
gcm 'setup typescript'

rm eslint.config.mjs
cp -r $HOME/dotfiles/nextjs/linter/ .
# npm i -D @next/eslint-plugin-next@15.1.6
npm i -D eslint-plugin-tailwindcss@3.18.0 knip prettier
sed -i '' -e  6s'|^|    "prebuild": "scripts/lint",\n|' package.json
sed -i '' -e  7s'|^|    "build": "next build",\n|' package.json
sed -i '' -e  9d package.json
sed -i '' -e  9s'|^|    "lint": "scripts/lint",\n|' package.json
sed -i '' -e 11d package.json
sed -i '' -e 10s'|,$||' package.json
gaa
gcm 'setup linter'

# https://github.com/vercel/next.js/issues/60038#issuecomment-1876273967
cp -r $HOME/dotfiles/nextjs/test/ .
npm i -D vitest
sed -i '' -e  6s'|scripts/lint|scripts/lint \&\& vitest run|' package.json
sed -i '' -e 10s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 11s'|^|    "test": "vitest run"\n|' package.json
gaa
gcm 'setup test'
```
