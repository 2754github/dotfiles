# 設定...

## 一般

- 全て`OFF`

## タグ

- 全て`削除`

## サイドバー

- 下記以外: 全て`OFF`
  - AirDrop
  - アプリケーション
  - 書類
  - ダウンロード
  - fkesys

## 詳細

- 全て`ON`

# 表示

- タブバーを表示
- サイドバーを表示
- プレビューを表示
- ツールバーを表示
- パスバーを表示
- ステータスバーを表示

# その他の設定

```sh
defaults write -g AppleShowAllExtensions -bool true
defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder

```
