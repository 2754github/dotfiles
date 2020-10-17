# 概要

環境構築を容易にするためのリポジトリ。

# 前提条件

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

# ターミナル（zsh）の設定

- フォント: `Ricty for Powerline`
- 背景: 不透明度 50%
- フォントサイズ: 18
- フォントカラー: シアン
- ボールド...使用: オン
- ウインドウ: 列 160 x 行 40

# 参考

- [Starship（シェルフレームワーク）](https://starship.rs/ja-JP/)
- [exa（ls の代替）](https://github.com/ogham/exa)
- [bat（cat の代替）](https://github.com/sharkdp/bat)
- [ripgrep（grep の代替）](https://github.com/BurntSushi/ripgrep)
- [Brewfile を使う](https://qiita.com/d0ne1s/items/90974ad472c2d891e784)

# next scope

- ターミナルの設定等のスクリプト化
- `$HOME/Library/Application\ Support/Code/User/settings.json`の共有
- `$HOME/.vscode/extensions`の共有
- `$HOME/.ssh/config`の共有
- `$HOME/.gitconfig`の共有
- `$HOME/.config/git/ignore`の共有
