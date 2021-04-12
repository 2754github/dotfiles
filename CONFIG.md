# ターミナル（zsh）

- テキスト
  - 背景: ブラック、不透明度 50~80%
  - フォント: `Ricty for Powerline 18pt.`
  - Text: 全て ☑️
    - Text: シアン
    - ボールドテキスト: オレンジ
    - 選択部分: パープル
- ウインドウ
  - ウインドウサイズ: 列 160 x 行 40

# システム環境設定（忘れがちなもののみ抜粋）

- Dock > `最近使ったアプリケーションをDockに表示`: オフ
- Mission Control > `最新の使用状況に...に並べ替える`: オフ
- Siri > `"Siri に頼む"を有効にする`: オフ
- アクセシビリティ >
  - `ディスプレイ/カーソル/カーソルのサイズ`: 中央
  - `ポインタコントロール/マウスとトラ.../オプション2つとも/スクロールの速さ`: 最速
- セキュリティとプライバシー >
  - `ファイアウォール`: オン
  - `プライバシー/フルディスクアクセス`: ターミナルに権限付与
- ネットワーク >
  - `（接続しているネットワークの）詳細.../DNS/DNSサーバ`: 下記を設定
  - `8.8.8.8` `8.8.4.4` `2001:4860:4860::8888` `2001:4860:4860::8844`
- Bluetooth > `メニューバーにBluetooth表示`: オン
- サウンド > `メニューバーに音量を表示`: オン
- キーボード >
  - `キーボード/`
    - `環境光が...を調整`: オフ
    - `Touch Barに表示する項目`: Control Strip（展開した状態）
    - `Control Stripをカスタマイズ...`: お好み
    - `修飾キー.../Caps Lock`: アクションなし
  - `ユーザー辞書/右ペインの項目`: 全てオフ（コーディングの邪魔になるため）
  - `音声入力/ショートカット`: オフ
- トラックパッド >
  - `ポイントとクリック/`
    - `調べる&データ検出`: オフ
    - `タップでクリック`: オン
    - `軌跡の速さ`: 最速
  - `スクロールとズーム/スクロールの方向: ナチュラル`: オフ
- ディスプレイ >
  - `ディスプレイ/`
    - `輝度を自動調整`: オフ
    - `True Tone`: オフ
  - `Night Shift`: `4:00~3:59`の間、`暖かく`に設定する。
- 省エネルギー > `バッテリー/バッテリー電源...暗くする`: オフ

# メニューバー

- バッテリー: 割合（%）を表示

# Finder

- Finder > 環境設定 >
  - `一般/デスクトップに表示させる項目`: `外部ディスク` `接続中のサーバ`のみオン
  - `一般/新規Finderウインドウで次を表示`: ダウンロード
  - `サイドバー`: お好み
  - `詳細`: 上から 4 つオン
- 表示 > タブバー、パスバー、ステータスバーを表示

```zsh:ターミナル
# Finderで隠しファイルを表示
$ defaults write com.apple.finder AppleShowAllFiles -boolean true
$ killall Finder
```

# その他

```zsh:ターミナル
# 共有フォルダで.DS_Storeを作成しない
$ defaults write com.apple.desktopservices DSDontWriteNetworkStores true

# スクリーンショットのデフォルト名を`ss`に
$ defaults write com.apple.screencapture name ss

# anyenv, nodenvの設定
$ anyenv install --init
> y
$ anyenv install nodenv
$ exec $SHELL -l

$ mkdir -p $(anyenv root)/plugins
$ git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update

$ mkdir -p $(nodenv root)/plugins
$ git clone https://github.com/nodenv/nodenv-default-packages.git $(nodenv root)/plugins/nodenv-default-packages

$ vim $(nodenv root)/default-packages
```

default-packages の中身

```
yarn
typescript
ts-node
typesync

```
