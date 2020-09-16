# 【記述ルール】
# 原則、「"」を使用する。ただし、awk/grep/find/sed/trでは「'」を使用する。
# ifでは「[[ ... ]]」を使用する。

# -----------------------------------------------------------------------------
# zsh aliases
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
  find $1 -type d \( -name '.git' -o -name '.next' -o -name '.memo' -o -name 'node_modules' \) -prune -o -type f -print |
  xargs md5
}

# https://zenn.dev/yuuyu/articles/0ade174349327d
ip () {
  echo " local: $(ifconfig en0 | awk '/inet / {print $2}')"
  echo "global: $(dig +short myip.opendns.com @resolver1.opendns.com)"
}

log () {
  printf "\e[36m$(date '+%Y年%m月%d日(%a) %H:%M:%S')\t$1\e[0m\n"
}

# https://songmu.jp/riji/entry/2015-05-08-mac-memory.html
purge () {
  local before=$(echo "scale=3; $(vm_stat | f free | awk3 | sed 's/.$//') * 4096 / 1024 / 1024 / 1024" | bc)
  sudo purge
  local after=$(echo "scale=3; $(vm_stat | f free | awk3 | sed 's/.$//') * 4096 / 1024 / 1024 / 1024" | bc)
  echo "空き容量: ${before} -> ${after} GB"
}

# https://qiita.com/bakanaouji/items/4fa9cfc9ddde972cd210
where-multi () {
  find $1 -type d \( -name '.git' -o -name '.next' -o -name '.memo' -o -name 'node_modules' \) -prune -o -type f |
  LANG=C xargs grep -n -v '^[[:cntrl:][:print:]]*$' --binary-files=without-match -dskip
}

# -----------------------------------------------------------------------------
# modern zsh aliases
alias cat="bat"
alias ls="exa"
alias ll="exa -alh -I='.git|node_modules' --time-style=long-iso"

# -i: 大文字小文字を区別しない / -l: ファイル名のみ / -w: 単語として検索
alias f="
  rg \
    -. \
    -g '!.git/' -g '!.next/' -g '!__snapshots__/' -g '!gotests_template/' -g '!mock/' -g '!node_modules/' \
    -g '!go.mod' -g '!go.sum' -g '!package-lock.json' \
    -g '!*.lock' -g '!*.snap' -g '!*.svg' \
"

# -----------------------------------------------------------------------------
# brew aliases
alias b-up="brew update && brew upgrade"
alias b-cleanup="brew cleanup"

# https://yulii.github.io/brew-cleanup-installed-formulae-20200509.html
b-non-dep-formulae () {
  brew list --formulae |
  xargs -P`expr $(sysctl -n hw.ncpu) - 1` -I{} sh -c '[[ `brew uses --installed {}` == "" ]] && echo {}'
}

# -----------------------------------------------------------------------------
# git aliases
alias current-branch="gb --show-current"
alias -g unstaged="f -v '^[^\s]\s'"
alias -g staged="f '^[^\s]\s'"
alias -g sedc="sed 's/:$//'"
alias -g sel="fzf -m"

# -p: パッチステージング
ga () { git add $1 $(gs | unstaged | sel | awk2) }
alias gaa="git add -A"

alias gb="git branch"
gbd () {
  local current=$(current-branch)
  local branches=("develop" "main" "master")
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
alias gcma="git commit --amend"

gd () { git diff -w $(gs | unstaged | sel | awk2) }
gdc () {
  local from=$(glo | sel | awk1)
  local to=$(glo $from..HEAD | sel | awk1)
  case $1 in
    "-n" ) git diff -w $from..$to --name-only ;;
    *    ) git diff -w $from..$to --diff-filter=d -- ':!docs/' ':!test/mock/' ':!go.sum' ':!*package-lock.json' ':!*.lock' ':!*.snap' $@ ;;
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
# greflog () { git reset --hard $(git reflog | sel | awk2 | sedc) }
gri () { git rebase -i HEAD~$1 }

alias gs="git status -s"

alias gstl="git stash list"
gst () {
  local subcmd=$(echo "list\nshow\nsave\nsave all\npop\n.\n.\n.\ndrop" | sel)
  case $subcmd in
    "list"     ) gstl ;;
    "show"     ) git stash show -p $(gstl | sel | awk1 | sedc) ;;
    "save"     ) git stash -u -- $(gs | sel | awk2) ;;
    "save all" ) read "msg?message: " && git stash save -u $msg ;;
    "pop"      ) git stash pop $(gstl | sel | awk1 | sedc) ;;
    "drop"     ) git stash drop $(gstl | sel | awk1 | sedc) ;;
    *          ) echo "cancelled" ;;
  esac
}

gsub () { git reset HEAD $(gs | staged | sel | awk2) }

gsw () { git switch $(gb | sel | sed 's/\*//') }

# -----------------------------------------------------------------------------
# VSCode aliases
export VSC_DIR="$HOME/Library/Application Support/Code/User"
export VSC_EXTENSIONS_DIR="$HOME/.vscode/extensions"
vsc () {
  local subcmd=$(echo "extensions\nsettings.json\nsnippets" | sel)
  case $subcmd in
    "extensions"    ) ll $VSC_EXTENSIONS_DIR ;;
    "settings.json" ) cat $VSC_DIR/settings.json ;;
    "snippets"      ) ll $VSC_DIR/snippets ;;
    *               ) echo "cancelled" ;;
  esac
}
vsc-rm-extension () { rm -r $(ls -d $VSC_EXTENSIONS_DIR/* | sel) }

# -----------------------------------------------------------------------------
# Next.js
alias nr="npm run"

nextjs-init () {
  local version=$(node -v | cut -c 2-)
  echo "親dir: $PWD"
  echo "Node.js: v$version"
  read "input?...でプロジェクトを作成しますか？[Y/n] "
  if [[ $input != Y ]]; then
    echo "nextjs-initを停止しました。"
    return 0
  fi

  read "project?プロジェクト名: "
  mkdir $project
  cd $project
  git init
  git remote add origin git@github.com:2754github/$project.git

  # https://nextjs.org/docs/getting-started/installation
  npx create-next-app@13.4.2 .
  gaa
  gcm "init"

  cp $HOME/dotfiles/nextjs/.npmrc .
  sed -i '' -e 5s"/^/  \"engines\": {\\n    \"node\": \">=$version\"\\n  },\\n/" package.json
  gaa
  gcm "setup npm"

  nextjs-setup-linter

  cp -r $HOME/dotfiles/nextjs/.vscode .vscode
  rm -fr app
  cp -r $HOME/dotfiles/nextjs/app app
  cp -r $HOME/dotfiles/nextjs/lib lib
  rm -fr public

  touch .env.sample
  asdf local nodejs $version

  cp $HOME/dotfiles/nextjs/next.config.js .
  npm i -D prettier-plugin-tailwindcss
  cp $HOME/dotfiles/nextjs/README.md .
  sed -i '' "s/@project/$project/" README.md

  gaa
  gcm "setup project"
  code .
}

nextjs-setup-linter () {
  rm .eslintrc.json
  cp -r $HOME/dotfiles/nextjs/linter/ .
  sed -i '' -e 10s'/^/    "prebuild": "scripts\/prebuild",\n/' package.json
  sed -i '' s'/next lint/scripts\/lint/' package.json
  sed -i '' -e 3s'/^/    "noUncheckedIndexedAccess": true,\n/' tsconfig.json

  # https://markuplint.dev/docs/guides/besides-html
  npm install -D markuplint @markuplint/jsx-parser @markuplint/react-spec

  # https://www.npmjs.com/package/eslint-config-airbnb
  npx install-peerdeps --dev eslint-config-airbnb

  # https://www.npmjs.com/package/eslint-config-airbnb-typescript
  npm install eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^5.13.0 \
            @typescript-eslint/parser@^5.0.0 \
            --save-dev

  # https://www.npmjs.com/package/eslint-plugin-prefer-arrow
  npm install -D eslint-plugin-prefer-arrow

  gaa
  gcm "setup linter"
}

# -----------------------------------------------------------------------------
# Rust

# https://doc.rust-jp.rs/book-ja/appendix-04-useful-development-tools.html
if which rustup > /dev/null 2>&1; then
  if ! rustup component list --installed | grep -q rls; then
    rustup component add rls
  fi
fi

# -----------------------------------------------------------------------------
# others
setopt nonomatch # https://shirusu-ni-tarazu.hatenablog.jp/entry/2013/01/18/034233

export FZF_DEFAULT_OPTS="--height 70% --reverse"
export LESSHISTFILE=-
export NODE_REPL_HISTORY="" # https://nodejs.org/api/repl.html#repl_environment_variable_options
export STARSHIP_CACHE=$HOME/.Trash/ # https://starship.rs/config/#logging

. $(brew --prefix asdf)/libexec/asdf.sh # https://asdf-vm.com/guide/getting-started.html#_3-install-asdf
eval "$(starship init zsh)"             # https://starship.rs/guide/#step-2-setup-your-shell-to-use-starship
