# 概要

環境構築の共有を容易にするためのリポジトリ。

# 前提条件

- zsh であること
- Homebrew がインストール済であること

# 導入

### 1. クローン

```zsh:ターミナル
$ git clone https://github.com/2754github/dotfiles.git
```

### 2. インストール

```zsh:ターミナル
$ sh dotfiles/settings/setup.sh
```

### 3. 忘れずに

```zsh:ターミナル
$ exec $SHELL -l
```

### x. `settings`から特定の設定のみの実行も可能

```zsh:ターミナル
# 例えばシンボリックリンクを貼り直すだけならこう
$ sh dotfiles/settings/link.sh
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

# next scope

- `$HOME/Library/Application\ Support/Code/User/settings.json`の共有
- `$HOME/.vscode/extensions`の共有
