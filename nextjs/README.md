```sh
org=2754github
repo=TODO
version=22

mkdir $repo
cd $repo
git init
git remote add origin git@github.com:$org/$repo.git

mise use -g node@$version
# https://nextjs.org/docs/getting-started/installation
npx create-next-app@latest .
gaa
gcm "\`create-next-app@latest .\` in node@$version"

mise use node@$version
cp $HOME/dotfiles/nextjs/next.config.mjs .
echo "# $repo" > README.md
gaa
gcm 'setup nextjs'

cp $HOME/dotfiles/nextjs/.npmrc .
sed -i '' -e 25s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 26s"|^|  \"engines\": {\\n    \"node\": \">=$version\"\\n  }\n|" package.json
npm i react react-dom
npm i -D typescript @types/node @types/react @types/react-dom postcss tailwindcss eslint
gaa
gcm 'setup npm'

# https://github.com/uhyo/better-typescript-lib
sed -i '' -e 2s'|^|  "extends": "@vercel/style-guide/typescript",\n|' tsconfig.json
sed -i '' s'|"exclude": \["node_modules"\]|"exclude": [".next", "build", "node_modules", "out"]|' tsconfig.json
npm i -D better-typescript-lib
gaa
gcm 'setup typescript'

rm .eslintrc.json
cp -r $HOME/dotfiles/nextjs/linter/ .
sed -i '' -e 6s'|^|    "prebuild": "scripts/prebuild",\n|' package.json
sed -i '' s'|"dev": "next dev",|"build": "next build",|' package.json
sed -i '' -e 8s'|"build": "next build",|"dev": "next dev",|' package.json
sed -i '' s'|"start": "next start",|"lint": "scripts/lint",|' package.json
sed -i '' s'|"lint": "next lint"|"start": "next start"|' package.json
# https://github.com/vercel/style-guide
npm i --save-dev @vercel/style-guide
npm i --save-dev @next/eslint-plugin-next
# https://github.com/tailwindlabs/prettier-plugin-tailwindcss
npm i -D prettier-plugin-tailwindcss
gaa
gcm 'setup linter'
```
