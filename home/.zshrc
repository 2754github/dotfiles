# util ------------------------------------------------------------------------
alias -g awk1="awk '{print \$1}'"
alias -g awk2="awk '{print \$2}'"
alias -g awk3="awk '{print \$3}'"

alias d="date '+%Y-%m-%d %H:%M:%S（%Z）'"
alias reload="clear && exec $SHELL -l"
alias rm-dsstore="ls-file . | f .DS_Store | xargs rm"

bell () {
  if [[ $? -ne 0 ]]; then
    afplay /System/Library/Sounds/Sosumi.aiff
  else
    afplay /System/Library/Sounds/Glass.aiff
  fi
}

# https://zenn.dev/yuuyu/articles/0ade174349327d
ip () {
  echo "private: $(ifconfig en0 | awk '/inet / {print $2}')"
  echo "global : $(dig +short myip.opendns.com @resolver1.opendns.com)"
}

ls-file () {
  find ${1:-.} -type d \( \
    -name '.git' \
    -o -name '.memo' \
    -o -name '.next' \
    -o -name 'build' \
    -o -name 'coverage' \
    -o -name 'go' \
    -o -name 'node_modules' \
    -o -name 'out' \
    -o -name 'vendor' \
  \) -prune -o -type f -print
}

md5-dir () {
  ls-file $1 | xargs md5
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
  ls-file $1 | LANG=C xargs grep -n -v '^[[:cntrl:][:print:]]*$' --binary-files=without-match -dskip
}

# modernize -------------------------------------------------------------------
alias cat="bat"
alias ls="eza"
alias ll="eza -alh --time-style=long-iso --icons"
alias tree="eza -a -I '.git|.memo|.next|build|coverage|go|node_modules|out|vendor' --icons -T -L "
alias f="rg \
  -. \
  -g '!.git/' \
  -g '!*.lock' \
  -g '!*.snap' \
  -g '!*.svg' \
  -g '!go.sum' \
  -g '!package-lock.json' \
  -g '!pnpm-lock.yaml' \
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
  local branches=(develop main master)
  local current=$(current-branch)
  for branch in "${branches[@]}"; do
    if [[ "$branch" == "$current" ]]; then
      gb -D $(gb | sel)
      return 0
    fi
  done

  echo "❌ delete branch out of [${branches[@]}] is not allowed"
  return 1
}
gbn () { git switch -c $1 }

gcf () { git commit --fixup=$(glo | sel | awk1) }
alias gcm="git commit -m"
gcma () { GIT_COMMITTER_DATE="$(git log -1 --pretty=format:%aI)" git commit --amend }
gcme () { git commit --allow-empty -m $1 }

gd () { git diff -w $(gs | unstaged | sel | awk2) }
gdc () {
  local from=$(glo | sel | awk1)
  local to=$(glo $from..HEAD | sel | awk1)
  case $1 in
    '-n' ) git diff -w $from..$to --name-status ;;
    *    ) git diff -w $from..$to --diff-filter=ad -- ':!*.lock' ':!*.snap' ':!*.svg' ':!go.sum' ':!package-lock.json' ':!pnpm-lock.yaml' $@ ;;
  esac
}

alias gfpush="git push --force-with-lease origin HEAD"
alias gfpull="git fetch && git reset --hard origin/$(current-branch)"

alias glo="git log --oneline"
gl () { glo -${1:-7} | awk '{print $0 " ... " NR}' }
glf () { glo $(gs | staged | sel | awk2) }
gld () { git log --date=iso --pretty=format:'[%h] %s%n%ad (author   : %an)%n%cd (committer: %cn)%n' -${1:-3} }

gr () { git restore $(gs | unstaged | sel | awk2) }

grc () {
  prev_commit=$(git rev-parse HEAD~$1)
  git log --oneline --reverse -$1 | while read commit_info; do
    echo $commit_info
    commit=$(echo $commit_info | awk1)
    diff_info=$(git diff -w $prev_commit..$commit --name-status)
    echo $diff_info
    echo $diff_info | while read file_info; do
      md5 $(echo $file_info | awk2)
    done
    prev_commit=$commit
  done
}
gri () { git rebase -i HEAD~$1 --committer-date-is-author-date }

alias gs="git status -s"

alias gstl="git stash list"
gst () {
  local subcmd=$(echo 'list\nshow\nsave\nsave all\npop\n.\n.\n.\ndrop' | sel)
  case $subcmd in
    'list'     ) gstl ;;
    'show'     ) git stash show -p $(gstl | sel | awk1 | sedc) ;;
    'save'     ) git stash -u -- $(gs | sel | awk2) ;;
    'save all' ) git stash save -u $(d) ;;
    'pop'      ) git stash pop $(gstl | sel | awk1 | sedc) ;;
    'drop'     ) git stash drop $(gstl | sel | awk1 | sedc) ;;
    *          ) echo 'cancelled' ;;
  esac
}

gsub () { git reset HEAD $(gs | staged | sel | awk2) }

gsw () { git switch $(gb | sel | sed 's|\*||') }

gwa () { git worktree add $1 $1 && code $1 }
gwr () { git worktree remove -f $(gs | unstaged | sel | awk2) }

# VS Code ---------------------------------------------------------------------
export VSC_DIR="$HOME/Library/Application Support/Code/User"
export VSC_EXT_DIR=$HOME/.vscode/extensions
vsc () {
  local subcmd=$(echo 'argv.json\nextensions\nkeybindings.json\nsettings.json\nsnippets' | sel)
  case $subcmd in
    'argv.json'        ) cat $HOME/.vscode/argv.json ;;
    'extensions'       ) ll $VSC_EXT_DIR ;;
    'keybindings.json' ) cat $VSC_DIR/keybindings.json ;;
    'settings.json'    ) cat $VSC_DIR/settings.json ;;
    'snippets'         ) ll $VSC_DIR/snippets ;;
    *                  ) echo 'cancelled' ;;
  esac
}
vsc-rm-ext () { rm -fr $(ls -d $VSC_EXT_DIR/* | sel) }

# others ----------------------------------------------------------------------
setopt INTERACTIVE_COMMENTS
source /opt/homebrew/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh
zstyle ':autocomplete:*' list-lines -1

export FZF_DEFAULT_OPTS="--height=70% --layout=reverse"
export LESSHISTFILE=-
export NODE_REPL_HISTORY='' # https://nodejs.org/api/repl.html#repl_environment_variable_options
export STARSHIP_CACHE=$HOME/.Trash # https://starship.rs/config/#logging

eval "$(mise activate zsh)" # https://mise.jdx.dev/getting-started.html#zsh
eval "$(starship init zsh)" # https://starship.rs/guide/#step-2-set-up-your-shell-to-use-starship
