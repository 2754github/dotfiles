# Finder

- Finder
  - 設定...
    - 一般: 全て OFF
    - タグ: 全て OFF
    - サイドバー: 下記のみ ON
      - AirDrop
      - アプリケーション
      - ダウンロード
      - fkesys
      - クラウドストレージ
    - 詳細: 全て ON
      - 検索実行時: 現在のフォルダ内を検索
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
