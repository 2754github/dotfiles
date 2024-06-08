```sh
org=2754github
repo=TODO
version=1.22

mkdir $repo
cd $repo
git init
git remote add origin git@github.com:$org/$repo.git

mise use go@$version
go mod init github.com/$org/$repo
cp $HOME/dotfiles/golang/.gitignore .
echo "# $repo" > README.md

cp -r $HOME/dotfiles/golang/.vscode .
sed -i '' s"|@@@gopath|$(go env GOPATH)|" .vscode/settings.json
sed -i '' s"|@@@goroot|$(go env GOROOT)|" .vscode/settings.json
sed -i '' s"|@@@org|$org|" .vscode/settings.json
sed -i '' s"|@@@repo|$repo|" .vscode/settings.json

cp $HOME/dotfiles/golang/Makefile .
sed -i '' s"|@@@org|$org|" Makefile
sed -i '' s"|@@@repo|$repo|" Makefile

gaa
gcm 'init'
```
