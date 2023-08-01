# Project Setup Guide

This guide provides detailed instructions on how to set up this project using various `make` commands defined in our `Makefile`.
We also discuss some of the key `make` commands that you will use to manage and clean up the project once it's set up.

このガイドでは、`Makefile`に定義された様々な `make` コマンドを使用してプロジェクトの設定を行う詳細な手順を提供します。
また、設定が完了した後にプロジェクトの管理とクリーンアップに使用する主要な `make` コマンドについても説明します。

## Direnv Configuration

Please note that [direnv](https://direnv.net/) must be installed for this project.

このプロジェクトでは[direnv](https://direnv.net/)のインストールが必須です。

Before building the project, you have to configure the `.envrc.private` file.
Begin by making a copy of the sample environment file:

プロジェクトをビルドする前に、`.envrc.private` ファイルでプロジェクトの設定を変更してください：

```bash
cp .envrc.sample .envrc.private
```

Afterwards, edit `.envrc.private` to set the environment variables as necessary.

その後、`.envrc.private` を編集して必要な環境変数を設定してください。

## Project launch

#### `make all`

This command runs `docker-compose up --build`, which is the default setup required by the subject of 42 schools.

このコマンドは `docker-compose up --build` を実行します。これは 42 School での課題要件です。

#### `make up`

This command starts the Docker project. If `DETACH=1` is set, the containers will start in the background.

このコマンドは Docker プロジェクトを開始します。`DETACH=1`が設定されている場合、コンテナはバックグラウンドで開始されます。

#### `make build`

This command builds the Docker project.

このコマンドは Docker プロジェクトをビルドします。

## Development

#### `make setup`

This command sets up the git commit message templates.

このコマンドは git のコミットメッセージテンプレートを設定します。

#### `make db`

This command starts the `db` Docker container. If `DETACH=1` is set, the container will start in the background.

このコマンドは`db`Docker コンテナを開始します。`DETACH=1`が設定されている場合、コンテナはバックグラウンドで開始されます。

#### `make studio`

This command launches Prisma Studio, which allows you to investigate the database status.

このコマンドは Prisma Studio を起動します。これにより、データベースの状況を調査することができます。

#### `make logs`

This command displays the Docker logs. If `DETACH=1` is set, it will show the received logs and then quit.

このコマンドは Docker のログを表示します。`DETACH=1`が設定されている場合、受信したログを表示してすぐに終了します。

## Cleanup

#### `make down`

This command stops the project.

このコマンドはプロジェクトを停止します。

#### `make clean`

This command stops the project and removes the database volume.

このコマンドはプロジェクトを停止し、データベースのボリュームを削除します。

#### `make cleanimage`

This command stops the project and removes Docker images.

このコマンドはプロジェクトを停止し、Docker イメージを削除します。

#### `make fclean`

This command stops the project and removes both volumes and images.

このコマンドはプロジェクトを停止し、ボリュームとイメージの両方を削除します。

#### `make re`

This command is a combination of `make fclean` and `make all`.

このコマンドは `make fclean` と `make all` の組み合わせです。

#### `make dockerclean`

This command removes all Docker resources across the system.

このコマンドはシステム全体のすべての Docker リソースを削除します。
