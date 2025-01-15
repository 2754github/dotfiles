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
npx create-next-app@15.0.0 .
# All Enter
gaa
gcm "\`create-next-app@15.0.0 .\` in node@$version"

mise use node@$version
cp $HOME/dotfiles/nextjs/.npmrc .
sed -i '' -e 25s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 26s"|^|  \"engines\": {\\n    \"node\": \">=$version\"\\n  }\n|" package.json
# npm i react react-dom
npm i -D typescript @types/node @types/react @types/react-dom postcss tailwindcss eslint
gaa
gcm 'setup npm'

# cp $HOME/dotfiles/nextjs/next.config.mjs .
cp $HOME/dotfiles/nextjs/next.config.ts .
# https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#:~:text=npm%20install%20server%2Donly
npm i server-only
gaa
gcm 'setup nextjs'

cp $HOME/dotfiles/nextjs/tsconfig.json .
npm i -D @vercel/style-guide
gaa
gcm 'setup typescript'

rm .eslintrc.json
cp -r $HOME/dotfiles/nextjs/linter/ .
# npm i -D @next/eslint-plugin-next@15.0.0
npm i -D eslint-plugin-tailwindcss knip prettier
sed -i '' -e  6s'|^|    "prebuild": "scripts/lint",\n|' package.json
sed -i '' -e  7s'|^|    "build": "next build",\n|' package.json
sed -i '' -e  9d package.json
sed -i '' -e  9s'|^|    "lint": "scripts/lint",\n|' package.json
sed -i '' -e 11d package.json
sed -i '' -e 10s'|,$||' package.json
gaa
gcm 'setup linter'
```
