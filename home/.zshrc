# util ------------------------------------------------------------------------
alias -g awk1="awk '{print \$1}'"
alias -g awk2="awk '{print \$2}'"
alias -g awk3="awk '{print \$3}'"

alias reload="clear && exec $SHELL -l"
alias rmdsstore="find . -type f -name '.DS_Store' -delete"

bell () {
  if [[ $? -ne 0 ]]; then
    afplay /System/Library/Sounds/Sosumi.aiff
  else
    afplay /System/Library/Sounds/Glass.aiff
  fi
}

hashdir () {
  find $1 -type d \( \
    -name '.git' -o \
    -name '.memo' -o \
    -name '.next' -o \
    -name 'build' -o \
    -name 'node_modules' -o \
    -name 'out' -o \
    -name 'vendor' \
  \) -prune -o -type f -print | xargs md5
}

# https://zenn.dev/yuuyu/articles/0ade174349327d
ip () {
  echo "private: $(ifconfig en0 | awk '/inet / {print $2}')"
  echo "global : $(dig +short myip.opendns.com @resolver1.opendns.com)"
}

# https://songmu.jp/riji/entry/2015-05-08-mac-memory.html
purge () {
  local before=$(echo "scale=3; $(vm_stat | f free | awk3 | sed 's|.$||') * 4096 / 1024 / 1024 / 1024" | bc)
  sudo purge
  local  after=$(echo "scale=3; $(vm_stat | f free | awk3 | sed 's|.$||') * 4096 / 1024 / 1024 / 1024" | bc)
  echo "free: $before -> $after GB"
}

# https://qiita.com/bakanaouji/items/4fa9cfc9ddde972cd210
where-multi () {
  find $1 -type d \( \
    -name '.git' -o \
    -name '.memo' -o \
    -name '.next' -o \
    -name 'build' -o \
    -name 'node_modules' -o \
    -name 'out' -o \
    -name 'vendor' \
  \) -prune -o -type f | LANG=C xargs grep -n -v '^[[:cntrl:][:print:]]*$' --binary-files=without-match -dskip
}

# modern ----------------------------------------------------------------------
alias cat="bat"
alias ls="eza"
alias ll="eza -alh --time-style=long-iso"
alias jq="jnv"
alias f="rg \
  -. \
  -g '!.git/' \
  -g '!*.svg' \
  -g '!package-lock.json' -g '!*.lock' -g '!*.snap' \
  -g '!go.sum' \
"

# brew ------------------------------------------------------------------------
# https://qiita.com/P-man_Brown/items/82b7e2f1e108a72d89f4
alias b-up="brew update && brew upgrade"
alias b-cleanup="brew autoremove && brew cleanup"

# https://yulii.github.io/brew-cleanup-installed-formulae-20200509.html
b-non-dep-formulae () {
  brew list --formulae | xargs -P`expr $(sysctl -n hw.ncpu) - 1` -I{} sh -c '[[ `brew uses --installed {}` == "" ]] && echo {}'
}

# git -------------------------------------------------------------------------
alias current-branch="gb --show-current"
alias -g unstaged="f -v '^[^\s]\s'"
alias -g staged="f '^[^\s]\s'"
alias -g sedc="sed 's|:$||'"
alias -g sel="fzf -m"

ga () { git add $1 $(gs | unstaged | sel | awk2) }
alias gaa="git add -A"

alias gb="git branch"
gbd () {
  local branches=('develop' 'main' 'master')
  local current=$(current-branch)
  for branch in "${branches[@]}"; do
    if [[ "$branch" == "$current" ]]; then
      git remote prune origin
      gb -D $(gb | sel)
      return 1
    fi
  done

  echo "❌ delete branch out of [${branches[@]}] is not allowed"
  return 0
}
gbn () { git switch -c $1 && git push origin HEAD }

gcf () { git commit --fixup=$(glo | sel | awk1) }
alias gcm="git commit -m"
alias gcma="git commit --amend --reset-author"

gd () { git diff -w $(gs | unstaged | sel | awk2) }
gdc () {
  local from=$(glo | sel | awk1)
  local to=$(glo $from..HEAD | sel | awk1)
  case $1 in
    "-n" ) git diff -w $from..$to --name-only ;;
    *    ) git diff -w $from..$to --diff-filter=d -- ':!*.svg' ':!*package-lock.json' ':!*.lock' ':!*.snap' ':!*go.sum' $@ ;;
  esac
}

alias gfpush="git push --force-with-lease origin HEAD"
alias gfpull="git fetch && git reset --hard origin/$(current-branch)"

alias glo="git log --oneline"
gl () {
  case $# in
    1 ) glo -$1 | awk '{print $0 " ... " NR}' ;;
    * ) glo -7  | awk '{print $0 " ... " NR}' ;;
  esac
}
glf () { glo $(gs | staged | sel | awk2) }

gr () { git restore $(gs | unstaged | sel | awk2) }

gri () { git rebase -i HEAD~$1 --committer-date-is-author-date }

alias gs="git status -s"

alias gstl="git stash list"
gst () {
  local subcmd=$(echo 'list\nshow\nsave\nsave all\npop\n.\n.\n.\ndrop' | sel)
  case $subcmd in
    "list"     ) gstl ;;
    "show"     ) git stash show -p $(gstl | sel | awk1 | sedc) ;;
    "save"     ) git stash -u -- $(gs | sel | awk2) ;;
    "save all" ) git stash save -u $(date '+%Y/%m/%d %H:%M:%S') ;;
    "pop"      ) git stash pop $(gstl | sel | awk1 | sedc) ;;
    "drop"     ) git stash drop $(gstl | sel | awk1 | sedc) ;;
    *          ) echo 'cancelled' ;;
  esac
}

gsub () { git reset HEAD $(gs | staged | sel | awk2) }

gsw () { git switch $(gb | sel | sed 's|\*||') }

# VS Code ---------------------------------------------------------------------
export VSC_DIR="$HOME/Library/Application Support/Code/User"
export VSC_EXTENSIONS_DIR=$HOME/.vscode/extensions
vsc () {
  local subcmd=$(echo 'extensions\nsettings.json\nsnippets' | sel)
  case $subcmd in
    "extensions"    ) ll $VSC_EXTENSIONS_DIR ;;
    "settings.json" ) cat $VSC_DIR/settings.json ;;
    "snippets"      ) ll $VSC_DIR/snippets ;;
    *               ) echo 'cancelled' ;;
  esac
}
vsc-rm-extension () { rm -fr $(ls -d $VSC_EXTENSIONS_DIR/* | sel) }

# others ----------------------------------------------------------------------
setopt nonomatch # https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233
source /opt/homebrew/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh

export FZF_DEFAULT_OPTS="--height=70% --layout=reverse"
export LESSHISTFILE=-
export NODE_REPL_HISTORY='' # https://nodejs.org/api/repl.html#repl_environment_variable_options
export STARSHIP_CACHE=$HOME/.Trash # https://starship.rs/config/#logging

eval "$(mise activate zsh)" # https://mise.jdx.dev/getting-started.html#zsh
eval "$(starship init zsh)" # https://starship.rs/guide/#step-2-set-up-your-shell-to-use-starship
