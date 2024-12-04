# ringo-viewer


<!-- Next-generation RoboCup Rescue Simulation Log Viewer -->


RoboCup Rescue Simulationで使用できるログビューワー


## セットアップ
### 1. 本リポジトリのクローンを作成

はじめに，本リポジトリをコンピュータにダウンロードします

```shell
git clone https://github.com/ringo-ringo-ringo/ringo-viewer.git
```


### 2. リポジトリへ移動

ダウンロードしたリポジトリへ移動を行います

```shell
cd ringo-viewer
```


### 3. 環境変数の設定

環境変数の定義を行う.envファイルの作成をいます

`.env.example`ファイルのコピーを貼り付け，`.env`へ名前を変えます

shellの場合は下記スクリプトより名前を変えた上でコピーができます

```shell
cp .env.example .env
```


### 4. 依存関係であるパッケージのインストール

本ソフトウェアで必要とされているパッケージのインストールを行います

下記のshellを実行すると，必要なパッケージがインストールされます

```shell
npm install
```


## 実行方法

### 1. ログファイルの保存

RoboCup Rescue Simulation Serverでシミュレーションが完了した後に出力されるログファイルを解凍した後，`/ringo-viewer/public/logs/`の中に配置します


### 2. ログのパスを記述

`.env`ファイル内の変数`NEXT_PUBLIC_DEFAULT_LOG_PATH`にログのファイルパスを格納します

このログパスはルートが`public`になっています

そのため`/ringo-viewer/public/logs/rescue.log`のようにログファイルを入れた場合は`NEXT_PUBLIC_DEFAULT_LOG_PATH=/logs/rescue.log`のようになります


### 3. サーバーの実行

サーバーを下記スクリプトで実行させます

```shell
npm run dev
```


### 4. シミュレーションを見る

ターミナル画面に出力されるアドレスへWebブラウザーを使用してアクセスしてください

<details><summary>URLを使用したログパスの指定方法</summary>

上記でセットアップおよび実行したものは，ルートURL(おそらく`http://localhost:3000/`)へアクセスした際に，`.env`に記述したログパスのログを読み込みます

一方，ルートURLに続いて`/path/<ログパス>`と入力してあげると，URL内に記述したログパスのログを読み込みます
例えば，`rescue.log`ディレクトリのログを読み込む場合は
`http://localhost:3000/path/rescue.log`
となります

こちらの方が直感的にログパスの指定ができる方や，サーバー等で使いたいという方はこちらを使用してください

</details>



## 説明書
<a href="docs/Instructions.md">説明書はこちら</a>


## 開発状況
<a href="docs/develop-status.md">開発状況はこちら</a>


## 困った時は

-  ログが読み込まれません

お使いのパソコン内で動作中の他プログラムで，`https://localhost:3000`のアドレスを使用している場合，ログが読み込まれない場合があります

このような場合，同じポート番号を使用しないように，本プログラムが3000番ポート以外のポート番号を使用し，サーバーが起動されます

本プログラムは3000番ポートで公開できるという前提で設計さえているため，このように3000番以外のポート番号を使用するとログが読み込まれなくなってしまいます

その場合，`.env`ファイルに記述されている`NEXT_PUBLIC_LOG_HOST`変数を現在公開されているアドレスに書き換えてください

