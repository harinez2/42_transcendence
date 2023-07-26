# 42_transcendence

## 開発を始める際の準備

以下の手順で setup スクリプトを実行してください

```bash
make setup
```
- コミット時の絵文字が導入されます。

## 起動準備

### direnvをインストールする
- [`direnv`](https://github.com/direnv/direnv)

#### Mac (zsh)

1. `brew install direnv`
2. `eval “$(direnv hook zsh)` を実行する or `.zshrc` に追記
3. `.envrc` があるディレクトリで `direnv allow .`

#### Linux (WSL2, Ubuntu 20.x(Focal Fossa))

1. `wget -O direnv https://github.com/direnv/direnv/releases/download/v2.32.3/direnv.linux-386`
2. `chmod +x direnv`
3. `sudo mv direnv /usr/local/bin/`
4. `echo 'eval "$(direnv hook bash)"' >> ~/.bashrc`
5. (必要に応じて) `source ~/.bashrc`
6. `.envrc` があるディレクトリで `direnv allow .`

### 環境変数を設定する

1. `cp .envrc.sample .envrc.private`
2. .envrc.privateに環境変数を設定

## 起動
　
```bash
make
```

起動完了したら、以下のURLでアクセスできる。
- フロントエンド http://localhost:5000/
- バックエンド http://localhost:3000/
- バックエンドAPI http://localhost:5432/

