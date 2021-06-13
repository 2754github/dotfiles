#「"」の使用を心がける。（ただし、awk/grep/sed/trでは「'」。）


# ========== history と completion ==========================================
# 参考：https://zenn.dev/k4zu/articles/zsh-tutorial#.zshrc%E3%81%AE%E8%A8%98%E8%BF%B0

# ========== history =======================================================
HISTFILE=$HOME/.zsh_history # ヒストリファイルの場所
SAVEHIST=100                # ヒストリファイルに保存するコマンド数
HISTSIZE=100                # メモリ上に保存する（検索できる）コマンド数
# setopt share_history        # 複数タブ間でヒストリファイルを共有する
setopt append_history       # 毎回ヒストリファイルを作るのではなく、追加していく形にする
setopt inc_append_history   # コマンド実行時に、そのコマンドをヒストリファイルに追加する

# ========== completion ====================================================
# 補完機能の有効化
autoload -Uz compinit && compinit

# 補完候補を「そのまま」「小 → 大文字」「大 → 小文字」の順に探す
zstyle ":completion:*" matcher-list "" "m:{[:lower:]}={[:upper:]}" "+m:{[:upper:]}={[:lower:]}"

# 補完方法毎にグループ化
zstyle ":completion:*" format "%B%F{blue}%d%f%b"
zstyle ":completion:*" group-name ""

# 補完侯補を一覧メニューから選択（select=2: 補完候補が2つ以上なければすぐに補完）
zstyle ":completion:*:default" menu select=2

# ========== other =========================================================
# 【zsh】curlでURLクエリ付きでGETしようとすると「no matches found」になるとき：https://qiita.com/kure/items/1b592cac4ecc360ba2de
# 【shell】zshでno matches found。：https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233
# zsh: no matches found について：https://eitya.hatenadiary.org/entry/20110707/1310023383
setopt nonomatch


# ========== fzf settings ==================================================
export FZF_DEFAULT_OPTS="--height 70% --reverse"


# ========== modern zsh aliases ============================================
alias cat="bat"
alias ls="exa"
alias grep="rg"
hg () { rg -l $pwd $1 }
alias ll="exa -alghF --git --ignore-glob='.git|node_modules' --time-style=long-iso"
tree () { exa -alghF --git --ignore-glob='.git|node_modules' --time-style=long-iso -T -L=$1 }


# ========== zsh aliases ===================================================
alias cz="bat ~/.zshrc"
alias exsh="exec $SHELL -l"
alias rmrf="rm -rf"
alias rmdsstore="find . -name '.DS_Store' -type f -ls -delete"
# うろ覚えcd
cdf () {
  local file &&
  file=$(find ${1:-.} -path "*/\.*" -prune -o -type f -print 2> /dev/null | fzf +m) &&
  cd ${file%/*}
}


# ========== brew aliases ======================================
brewinfo () {
  echo "\n==== brew update ====" &&
  brew update &&
  echo "\n==== Installed ====" &&
  brew list &&
  echo &&
  echo -e "\e[1mFormulae\e[0m \e[38;5;12m==>\e[0m $(brew list --formula | wc -l | sed 's/ //g')" &&
  echo -e "\e[1mCasks\e[0m    \e[38;5;12m==>\e[0m $(brew list --cask | wc -l | sed 's/ //g')" &&

  echo "\n==== Outdated ====" &&
  echo -e "\e[38;5;12m==>\e[0m \e[1mFormulae\e[0m" &&
  brew outdated &&
  echo &&
  echo -e "\e[38;5;12m==>\e[0m \e[1mCasks\e[0m" &&
  brew outdated --cask
}

brewcleanup () {
  brew cleanup --dry-run &&
  echo -e "\e[38;5;12m==>\e[0m \e[1mCleanup? [Y/n]\e[0m" &&
  read input &&
  if [ "$input" = "Y" ]; then
    brew cleanup &&
    echo "Cleanup completed."
  else
    echo "Cleanup canceled."
  fi
}

# 注意：dockerのupgrade時にはパスワードが求められる。
# brewupdate () {
#   brew update && brew upgrade && brew cleanup -s && brew upgrade --cask --greedy
# }

# https://yulii.github.io/brew-cleanup-installed-formulae-20200509.html
brewdeps () {
  local N deletable_formulae &&
  deletable_formulae="" &&
  for formula in $(brew list --formula); do
    N=$(brew uses --installed $formula | wc -l) &&
    printf "%22s is used by %2d formulae." $formula $N &&
    if [ $N -eq 0 ]; then
      deletable_formulae="$deletable_formulae\n$formula" &&
      echo &&
    else
      printf " (" &&
      echo $(brew uses --installed $formula | tr '\n' ',' | sed 's/,$/)/g' | sed 's/,/, /g') &&
    fi
  done
  echo "\n==== Deletable Formulae ====$deletable_formulae"
}

brewtree () {
  local M N &&
  for formula in $(brew list --formula); do
    M=$(brew deps --tree $formula | wc -l | sed 's/ //g') &&
    # expr の 結果が 0 になると 戻り値が 1 になる件：https://qiita.com/wenbose/items/e8eb5a608d6d2fa8b0bf
    if [ "$M" = "2" ]; then
      N=0 &&
    else
      N=$(expr $M - 2) &&
    fi
    echo "$formula depends on \e[1m$N\e[0m formulae." &&
    if [ "$1" = "-v" ]; then
      brew deps --tree $formula | sed '1d' &&
    fi
  done
}


# ========== docker aliases ================================================
alias dps="docker system df"
dls () {
  local subcommands subcommand
  subcommands="image\ncontainer\nvolume\nnetwork" &&
  subcommand=$(echo $subcommands | fzf +m) &&
  docker $subcommand ls
}
alias drm="docker system prune"


# ========== docker-compose aliases ========================================
alias dc="docker-compose"
alias dcr="docker-compose run --rm"
# alias -g cre:show="rails credentials:show"
# alias -g cre:edit="bash -c 'EDITOR=vi bin/rails credentials:edit'"


# ========== git aliases ===================================================
alias github="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr : /)"
alias gpr="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr : /)/pulls?q=author%3A%40me+"
alias gb="git branch"
alias gl="git log --oneline -7"
alias gs="git status -s"
alias gcm="git commit -m "
alias gp="git push origin HEAD"
alias gpf="git push -f origin HEAD"
gp1 () {
  local current commits commit
  current=$(git branch --contains=HEAD | awk '{print $2}') &&
  commits=$(git log --oneline origin/$current..HEAD) &&
  commit=$(echo $commits | fzf +m) &&
  git push origin $(echo $commit | awk '{print $1}'):refs/heads/$current
}
g () {
  local subcommands subcommand
  subcommands="git add -A\ngit rebase -i HEAD~?\ngit pull\nキャンセル" &&
  subcommand=$(echo $subcommands | fzf +m) &&
  if [ $subcommand = "git add -A" ]; then
    git add -A
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
  git checkout main || git checkout master &&
  git pull &&
  echo "新しいブランチ名を入力してください:" &&
  read branch &&
  git switch -c $branch || git checkout -b $branch &&
  git commit --allow-empty -m "NOPR: squash me [ci skip]" &&
  git push -u origin HEAD
}
gf () {
  local subcommands subcommand files file
  subcommands="diff\nadd\nrestore\nsubtract\ncheckout" &&
  subcommand=$(echo $subcommands | fzf +m) &&
  files=$(git status -s) &&
  file=$(echo $files | fzf +m | awk '{print $2}') &&
  if [ $subcommand = "subtract" ]; then
    git reset HEAD $file
  else
    git $subcommand $file
  fi
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
  git switch $(echo $branch | awk '{print $1}' | sed 's/.* //') ||
  git checkout $(echo $branch | awk '{print $1}' | sed 's/.* //')
}


# ========== VSCode aliases ================================================
vsc () {
  echo "Settings => $HOME/Library/Application\ Support/Code/User/settings.json" &&
  cat $HOME/Library/Application\ Support/Code/User/settings.json &&
  echo "Extensions => $HOME/.vscode/extensions" &&
  ll $HOME/.vscode/extensions
}
vsc-rm () {
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


# PATH
eval "$(starship init zsh)"
eval "$(anyenv init -)"
eval "$(direnv hook zsh)"
