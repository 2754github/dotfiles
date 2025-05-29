# nextjs

```sh
org=2754github
repo=TODO
version=24.0.1
nextjs=15.4.1

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

mise use node@$version
cp $HOME/dotfiles/nextjs/.npmrc .
sed -i '' -e 26s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 27s"|^|  \"engines\": {\\n    \"node\": \">=$version\"\\n  }\n|" package.json
npm i -D @types/node@$version
npm i -D @types/react@$(jq -r '.dependencies.react' package.json)
npm i -D @types/react-dom@$(jq -r '.dependencies."react-dom"' package.json)
npm i -D $(jq -r '.devDependencies | to_entries | map(select(.value | test("^[^0-9]"))) | .[].key' package.json | tr '\n' ' ')
npm i -D @tailwindcss/postcss@$(jq -r '.devDependencies.tailwindcss' package.json)
gaa
gcm 'setup npm'

cp $HOME/dotfiles/nextjs/next.config.ts .
# https://nextjs.org/docs/app/guides/data-security#preventing-client-side-execution-of-server-only-code
npm install server-only
gaa
gcm 'setup nextjs'

cp -r $HOME/dotfiles/nextjs/linter/ .
npm un @eslint/eslintrc
npm i -D eslint-plugin-perfectionist eslint-plugin-unicorn knip neostandard prettier
sed -i '' s'|next lint|knip --no-exit-code \&\& prettier --check . \&\& next lint|' package.json
gaa
gcm 'setup linter'
```

## Optional

```sh
cp -r $HOME/dotfiles/nextjs/test/ .
npm i -D vitest @vitest/coverage-v8
npm i -D @vitest/coverage-v8@$(jq -r '.devDependencies.vitest' package.json)
sed -i '' -e  9s'|^\(.*\)$|\1,|' package.json
sed -i '' -e 10s'|^|    "test": "vitest run"\n|' package.json
gaa
gcm 'setup test'
```
