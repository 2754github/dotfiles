# 概要

環境構築を容易にするためのリポジトリ。

# 前提

zsh であること

# 導入

### 1. クローン

```zsh:ターミナル
$ cd $HOME && git clone https://github.com/2754github/dotfiles.git
```

### 2. インストール

```zsh:ターミナル
$ chmod u+x $HOME/dotfiles/install && $HOME/dotfiles/install
```

### 3. 忘れずに

```zsh:ターミナル
$ exec $SHELL -l
```

<details>
<summary>zsh compinit: insecure directories, run compaudit for list.</summary>
<div>

```zsh:ターミナル
Ignore insecure directories and continue [y] or abort compinit [n]?
> y

$ compaudit
There are insecure directories:
/usr/local/share/zsh/site-functions
/usr/local/share/zsh

$ chmod 755 /usr/local/share/zsh/site-functions /usr/local/share/zsh
$ exec $SHELL -l
```

</div>
</details>

# 細かい設定

- https://github.com/2754github/dotfiles/blob/master/CONFIG.md

# 参考

- [bat（cat の代替）](https://github.com/sharkdp/bat)
- [exa（ls の代替）](https://github.com/ogham/exa)
- [fzf（あいまい検索）](https://github.com/junegunn/fzf)
- [ripgrep（grep の代替）](https://github.com/BurntSushi/ripgrep)
- [Starship（シェルフレームワーク）](https://starship.rs/ja-JP/)
- [Brewfile を使う](https://qiita.com/d0ne1s/items/90974ad472c2d891e784)

# next scope

- ターミナルの設定等のスクリプト化
- `$HOME/Library/Application\ Support/Code/User/settings.json`の共有
- `$HOME/.vscode/extensions`の共有
- `$HOME/.ssh/config`の共有
