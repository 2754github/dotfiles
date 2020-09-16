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
  cd "$dir"
}
alias rmd="rm -rf"

# modern zsh aliases
alias ls="exa"
alias ll="exa --long --header --git --time-style=long-iso -agl"
alias tr='(){exa -alhF --git-ignore --group-directories-first --time-style=long-iso -T -L=$1 --ignore-glob=".git|node_modules"}'

alias cat="bat"

alias hg='(){rg $2 $1 -l}'

# brew aliases
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
alias gl="git log --oneline"
alias gs="git status -s"
alias gd="git diff"

gch () {
  local branches branch
  branches=$(git branch) &&
  branch=$(echo "$branches" | fzf +m) &&
  git checkout $(echo "$branch" | awk '{print $1}' | sed "s/.* //")
}

alias ga="git add"
alias gcm='(){git commit -m $1}'
alias gp="git push origin HEAD"

# myfunc
alias secret="sh ~/secret/secret.sh"

# [【zsh】curlでURLクエリ付きでGETしようとすると「no matches found」になるとき](https://qiita.com/kure/items/1b592cac4ecc360ba2de)
# [【shell】zshでno matches found。](https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233)
# [zsh: no matches found について](https://eitya.hatenadiary.org/entry/20110707/1310023383)
setopt nonomatch

eval "$(anyenv init -)"
