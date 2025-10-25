# Finder

- Finder
  - 設定...
    - 一般: 全てOFF
    - タグ: 全てOFF
    - サイドバー: 下記のみON
      - AirDrop
      - アプリケーション
      - ダウンロード
      - fkesys
    - 詳細: 全てON
- 表示
  - タブバーを表示
  - サイドバーを表示
  - プレビューを表示
  - ツールバーを表示
  - パスバーを表示
  - ステータスバーを表示

```sh
defaults write NSGlobalDomain AppleShowAllExtensions -bool true
defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder
```
