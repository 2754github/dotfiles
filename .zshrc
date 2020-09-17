eval "$(starship init zsh)"

# 入力補完？
# autoload -U compinit && compinit -u



# zsh aliases
alias vz="vim ~/.zshrc"
alias cz="bat ~/.zshrc"
alias vss="vim ~/.config/starship.toml"
alias sz="source ~/.zshrc"

alias clc="clear"
fcd() {
  local dir
  dir=$(find ${1:-.} -path '*/\.*' -prune -o -type d -print 2> /dev/null | fzf +m) &&
  cd $dir
}
alias exsh="exec $SHELL -l"
alias rmd="rm -rf"
alias rmdsstore="find . -name '.DS_Store' -type f -ls -delete"



# modern zsh aliases
alias ls="exa"
alias ll="exa --long --header --git --time-style=long-iso -agl"
alias tree='(){exa -alhF --git-ignore --group-directories-first --time-style=long-iso -T -L=$1 --ignore-glob=".git|node_modules"}'

alias cat="bat"

alias hg='(){rg $2 $1 -l}'



# brew aliases
alias brup="brew update && brew upgrade"
alias brnum="echo $(brew list | wc -l)"
alias brdeps='(){brew deps --tree $1}'
alias bruses='(){brew uses --installed $1}'
bralldeps () {
  for package in $(brew list); do
    echo $package: $(brew uses --installed $package | wc -l)
  done
}
bralldeps0 () {
  for package in $(brew list); do
    echo -n $package: $(brew uses --installed $package | wc -l) | grep " 0"
  done
}



# git aliases
alias gitls="alias | grep git"
alias github="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr : /)"
alias gl="git log --oneline -n 5"
alias gs="git status -s"
alias gd="git diff"
alias ga="git add -i"
alias gc="git commit -m "
alias gp="git push origin HEAD"

gch () {
  local branches branch
  branches=$(git branch) &&
  branch=$(echo $branches | fzf +m) &&
  git checkout $(echo $branch | awk '{print $1}' | sed "s/.* //")
}

gcom () {
  git add -i &&
  git log --oneline -n 5 &&
  echo "コミットメッセージを入力してください:" &&
  read message &&
  git commit -m $message &&
  git log --oneline -n 3
}



# vscode aliases
vscode () {
  echo "Settings" &&
  cat $HOME/Library/Application\ Support/Code/User/settings.json &&
  echo "Extensions" &&
  ll $HOME/.vscode/extensions
  cat $HOME/.vscode/extensions/.memo
}
alias vscode_mmex="vim $HOME/.vscode/extensions/.memo"
vscode_rmex () {
  local extensions extension
  extensions=$(ls $HOME/.vscode/extensions) &&
  extension=$(echo $extensions | fzf +m) &&
  echo "$extension を削除しますか？[Y/n]" &&
  read res &&
  if [ $res = "Y" ]; then
    rm -r $HOME/.vscode/extensions/$extension &&
    echo "$extension を削除しました。"
  else
    echo "$extension を削除しませんでした。"
  fi
}



# myfunc
alias memo="open /System/Applications/Notes.app"
alias secret="sh ~/secret/secret.sh"



# [【zsh】curlでURLクエリ付きでGETしようとすると「no matches found」になるとき](https://qiita.com/kure/items/1b592cac4ecc360ba2de)
# [【shell】zshでno matches found。](https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233)
# [zsh: no matches found について](https://eitya.hatenadiary.org/entry/20110707/1310023383)
setopt nonomatch

eval "$(anyenv init -)"
