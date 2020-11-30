#「"」の使用を心がける。（ただし、awk/sedでは「'」。）


# [【zsh】curlでURLクエリ付きでGETしようとすると「no matches found」になるとき](https://qiita.com/kure/items/1b592cac4ecc360ba2de)
# [【shell】zshでno matches found。](https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233)
# [zsh: no matches found について](https://eitya.hatenadiary.org/entry/20110707/1310023383)
setopt nonomatch


# fzfの設定
export FZF_DEFAULT_OPTS="--height 70% --reverse"


# modern zsh aliases
alias cat="bat"
alias ls="exa"
alias grep="rg"
hg () { rg -l $pwd $1 }
alias ll="exa -alghF --git --ignore-glob='.git|node_modules' --time-style=long-iso"
tree () { exa -alghF --git --ignore-glob='.git|node_modules' --time-style=long-iso -T -L=$1 }


# zsh aliases
alias vz="vim ~/.zshrc"
alias cz="bat ~/.zshrc"
alias sz="source ~/.zshrc"
alias exsh="exec $SHELL -l"
alias rmd="rm -rf"
alias rmdsstore="find . -name '.DS_Store' -type f -ls -delete"
# 説明: 曖昧検索版cd
fcd () {
  local dir
  dir=$(find ${1:-.} -path "*/\.*" -prune -o -type d -print 2> /dev/null | fzf +m) &&
  cd $dir
}


# brew & brew cask aliases
alias brod="brew outdated && brew outdated --cask"
# 注意: dockerのupgrade時にはパスワードが求められる。
brup () {
  brew update && brew upgrade && brew cleanup -s &&
  brew upgrade --cask --greedy
}
brnum () {
  echo "brew: $(brew list --formula | wc -l)" &&
  echo "cask: $(brew list --cask | wc -l)"
}
# 説明: 当該formulaがどのformulaに使われているかを出力する。（0ならトップレベルのformula）
brdep () {
  for formula in $(brew list --formula); do
    echo $formula $(brew uses --installed $formula | wc -l) $(brew uses --installed $formula)
  done
}
# https://yulii.github.io/brew-cleanup-installed-formulae-20200509.html
alias br0="brew list --formula | xargs -I{} sh -c 'brew uses --installed {} | wc -l | xargs printf \"%10s is used by %1d formula.\n\" {}' | grep \"[^1-9]0 formula\""


# docker aliases
alias dps="docker system df"
dls () {
  local subcommands subcommand
  subcommands="image\ncontainer\nvolume\nnetwork" &&
  subcommand=$(echo $subcommands | fzf +m) &&
  docker $subcommand ls
}
alias drm="docker system prune"


# docker-compose aliases
alias dcu="docker-compose up"
alias dcr="docker-compose run --rm"
# alias -g cre:show="rails credentials:show"
# alias -g cre:edit="bash -c 'EDITOR=vi bin/rails credentials:edit'"


# git aliases
alias github="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr : /)"
alias gpr="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr : /)/pulls?q=author%3A%40me+"
alias gl="git log --oneline -7"
alias gs="git status -s"
alias gp="git push origin HEAD"
g () {
  local subcommands subcommand
  subcommands="git add -A\ngit commit -m ?\ngit rebase -i HEAD~?\ngit pull\nキャンセル" &&
  subcommand=$(echo $subcommands | fzf +m) &&
  if [ $subcommand = "git add -A" ]; then
    git add -A
  elif [ $subcommand = "git commit -m ?" ]; then
    echo "コミットメッセージを入力してください:" &&
    read message &&
    git commit -m $message
  elif [ $subcommand = "git rebase -i HEAD~?" ]; then
    echo "n個前のコミットまで遡ります:" &&
    read n &&
    git rebase -i HEAD~$n
  elif [ $subcommand = "git pull" ]; then
    git pull
  else
    echo "キャンセルしました。"
  fi
}
gnew () {
  git checkout master &&
  git pull &&
  echo "新しいブランチ名を入力してください:" &&
  read branch &&
  git switch -c $branch &&
  git commit --allow-empty -m "NOPR: squash me [ci skip]" &&
  git push -u origin HEAD
}
gd () {
  local files file
  files=$(git status -s) &&
  file=$(echo $files | fzf +m) &&
  git diff $(echo $file | awk '{print $2}')
}
gre () {
  local files file
  files=$(git status -s) &&
  file=$(echo $files | fzf +m) &&
  git restore $(echo $file | awk '{print $2}')
}
# 説明: git addによりステージングされたファイルをステージング前の状態に戻す。
gsub () {
  local files file
  files=$(git status -s) &&
  file=$(echo $files | fzf +m) &&
  git reset HEAD $(echo $file | awk '{print $2}')
}
gcom () {
  git add -i &&
  git log --oneline -3 &&
  echo "コミットメッセージを入力してください:" &&
  read message &&
  git commit -m $message
}
gcf () {
  local commits commit
  commits=$(git log --oneline) &&
  commit=$(echo $commits | fzf +m) &&
  git commit --fixup=$(echo $commit | awk '{print $1}')
}
gsw () {
  local branches branch
  branches=$(git branch) &&
  branch=$(echo $branches | fzf +m) &&
  git switch $(echo $branch | awk '{print $1}' | sed 's/.* //')
}


# vscode aliases
vsc () {
  echo "Settings => $HOME/Library/Application\ Support/Code/User/settings.json" &&
  cat $HOME/Library/Application\ Support/Code/User/settings.json &&
  echo "Extensions => $HOME/.vscode/extensions" &&
  ll $HOME/.vscode/extensions
}
vsc_rm () {
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


# my aliasis
alias secret="sh ~/secret/secret.sh"


# PATHを通す
eval "$(starship init zsh)"
eval "$(anyenv init -)"
eval "$(direnv hook zsh)"
