# 概要
環境構築の共有を容易にするためのリポジトリ。

# 導入
### 1. クローン
```zsh:ターミナル
$ git clone https://github.com/2754github/dotfiles.git
```

### 2. インストール
```zsh:ターミナル
$ sh dotfiles/settings/setup.sh
```

### x. `settings`から特定の設定のみの実行も可能
```zsh:ターミナル
$ sh dotfiles/settings/xxxx.sh
```

# ターミナル（zsh）の設定
- ターミナルのフォントを`Ricty for Powerline`に変更
- 背景: 不透明度50%
- フォントサイズ: 18
- フォントカラー: シアン
- ウインドウ: 列160 x 行40

# 参考
- [Starship](https://starship.rs/ja-JP/)
- [exa（lsの代替）](https://github.com/ogham/exa)
- [bat（catの代替）](https://github.com/sharkdp/bat)
- [ripgrep（grepの代替）](https://github.com/BurntSushi/ripgrep)
