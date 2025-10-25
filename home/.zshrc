# util ------------------------------------------------------------------------
alias -g awk1="awk '{print \$1}'"
alias -g awk2="awk '{print \$2}'"
alias -g awk3="awk '{print \$3}'"

alias r='clear && exec $SHELL -l'
alias rm-docker='docker system prune -a --volumes'
alias rm-dsstore='ls-file | f -w .DS_Store | xargs -I{} rm -v {}'

bell () {
  if [[ $? -eq 0 ]]; then
    afplay /System/Library/Sounds/Glass.aiff
  else
    afplay /System/Library/Sounds/Sosumi.aiff
  fi
}

# https://zenn.dev/yuuyu/articles/0ade174349327d
alias ip="ifconfig en0 | awk '/inet / { print \$2 }'"

ls-file () {
  # if [[ -d .git ]]; then
  #   git ls-files ${1:-.} -co --exclude-standard
  # else
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
  # fi
}

md5-dir () { ls-file $1 | xargs md5 }
md5sum-dir () { ls-file $1 | xargs md5 -q | md5 }

# https://songmu.jp/riji/entry/2015-05-08-mac-memory.html
free () { echo "scale=3; $(vm_stat | f free | awk3 | sed 's|.$||') * 4096 / 1024 / 1024 / 1024" | bc }
purge () {
  local before=$(free)
  sudo purge
  local after=$(free)
  echo "free: $before -> $after GB"
}

where-multi () {
  # https://qiita.com/bakanaouji/items/4fa9cfc9ddde972cd210
  ls-file $1 | LANG=C xargs grep -n -v '^[[:cntrl:][:print:]]*$' --binary-files=without-match -dskip
}

# modernize -------------------------------------------------------------------
alias cat='bat'
alias ls='eza'
alias ll='eza -ahl --icons --time-style long-iso'
alias tree="eza -aT -I '.git|.memo|.next|build|coverage|go|node_modules|out|vendor' -L"

# ディレクトリを無視する場合、`-g '!dir/'` で良い。
# ディレクトリを含める場合、`-g 'dir/**'` にしなければならない。
alias f="rg -. \
  -g '!.git/' \
  -g '!*.gen.go' \
  -g '!*.lock' \
  -g '!*.snap' \
  -g '!*.svg' \
  -g '!go.sum' \
  -g '!package-lock.json' \
  -g '!pnpm-lock.yaml' \
"

# brew ------------------------------------------------------------------------
# https://qiita.com/P-man_Brown/items/82b7e2f1e108a72d89f4
alias b-up='brew update && brew upgrade && brew upgrade --casks -g && brew cleanup && brew autoremove'

b-no-dep-formulae () {
  # https://yulii.github.io/brew-cleanup-installed-formulae-20200509.html
  brew list --formulae | xargs -P`expr $(sysctl -n hw.ncpu) - 1` -I{} sh -c '[[ `brew uses --installed {}` == "" ]] && echo {}'
}

# git -------------------------------------------------------------------------
alias -g sedc="sed 's|:$||'"
alias -g sel='fzf -m'
alias -g staged="f '^[^ ] '"
alias -g unstaged="f -v '^[^ ] '"

alias current-branch='gb --show-current'

ga () { git add $1 $(gs | unstaged | sel | awk2) }
alias gaa='git add -A'

alias gb='git branch'
alias gbn='git switch -c'
gbd () {
  local current=$(current-branch)
  local branches=(develop main master)
  if [[ " ${branches[@]} " =~ " $current " ]]; then
    gb -D $(gb | sel)
  else
    echo "❌do not delete branches out of [${branches[@]}]"
  fi
}

alias gcme='git commit --allow-empty -m'
alias gcm='git commit -m'
alias gcma='GIT_COMMITTER_DATE=$(git log -1 --pretty=format:%aI) git commit --amend --no-edit'
alias gcf='git commit --fixup $(glo | sel | awk1)'

alias gd='git diff -w $(gs | unstaged | sel | awk2)'
gdc () {
  local from=$(glo | sel | awk1)
  local to=$(glo $from..HEAD | sel | awk1)
  case $1 in
    '-n' ) git diff $from..$to --name-status ;;
    *    ) git diff -w $from..$to --diff-filter ad -- \
      ':!*.gen.go' \
      ':!*.lock' \
      ':!*.snap' \
      ':!*.svg' \
      ':!go.sum' \
      ':!package-lock.json' \
      ':!pnpm-lock.yaml' \
    $@ ;;
  esac
}

alias gfpull='git fetch && git reset --hard origin/$(current-branch)'
alias gfpush='git push --force-with-lease origin HEAD'

alias glo='git log --oneline'
gl () { glo -${1:-7} | awk '{print $0 ":\t" NR}' }
gld () { git log --date iso --pretty=format:'[%h] %s%n%ad (author:    %an)%n%cd (committer: %cn)%n' -${1:-3} }
alias glf='glo $(gs | staged | sel | awk2)'

alias gsub='git restore -S $(gs | staged | sel | awk2)'
alias gr='git restore $(gs | unstaged | sel | awk2)'

grc () {
  local prev_commit=$(git rev-parse HEAD~$1)
  glo --reverse -$1 | while read commit_info; do
    echo $commit_info
    local commit=$(echo $commit_info | awk1)
    local diff_info=$(git diff -w $prev_commit..$commit --name-status)
    echo $diff_info
    echo $diff_info | while read file_info; do
      md5 $(echo $file_info | awk2)
    done
    local prev_commit=$commit
  done
}
gri () { git rebase -i HEAD~$1 --committer-date-is-author-date }

alias gs='git status -s'

alias gstl='git stash list'
gst () {
  local sub_cmd=$(echo 'list\nshow\nsave\nsave all\npop\n.\n.\n.\ndrop' | sel)
  case $sub_cmd in
    'list'     ) gstl ;;
    'show'     ) git stash show -p $(gstl | sel | awk1 | sedc) ;;
    'save'     ) git stash -u -- $(gs | sel | awk2) ;;
    'save all' ) git stash save -u $(date '+%Y-%m-%d %H:%M:%S (%Z)') ;;
    'pop'      ) git stash pop $(gstl | sel | awk1 | sedc) ;;
    'drop'     ) git stash drop $(gstl | sel | awk1 | sedc) ;;
    *          ) echo 'canceled' ;;
  esac
}

gsw () { git switch $(gb | sel | sed 's|\*||'); bell }

gwa () { git worktree add $1 $1 && code $1 }
alias gwr='git worktree remove -f $(gs | unstaged | sel | awk2)'

# VS Code ---------------------------------------------------------------------
alias vsc="code '$HOME/Library/Application Support/Code/User'"
alias vsc-rm-ext='rm -frv $(ls -d $HOME/.vscode/extensions/* | sel)'

# others ----------------------------------------------------------------------
setopt INTERACTIVE_COMMENTS
source /opt/homebrew/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh
zstyle ':autocomplete:*' min-input 4

export FZF_DEFAULT_OPTS='--height 70% --layout reverse'
export LESSHISTFILE=-
export NODE_REPL_HISTORY='' # https://nodejs.org/api/repl.html#repl_environment_variable_options
export STARSHIP_CACHE=$HOME/.Trash # https://starship.rs/config/#logging

eval "$(mise activate zsh)" # https://mise.jdx.dev/getting-started.html#activate-mise
eval "$(starship init zsh)" # https://starship.rs/guide/#step-2-set-up-your-shell-to-use-starship
