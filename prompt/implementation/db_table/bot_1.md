はい、承知いたしました。オンラインイベント向けのリアルタイムアンケートWebサービスの仕様に基づき、データベースのテーブル設計を提案します。

Express, Socket.io, SvelteKitの技術スタックで、同時接続50〜100人規模を想定した、シンプルで拡張しやすい構造を意識しました。

-----

## データベース設計案

主要なエンティティ（情報の塊）として「管理者」「部屋」「アンケート」「選択肢」「回答」の5つを定義し、それぞれテーブルを作成します。

### 1\. 管理者テーブル (`Admins`)

システムにログインし、イベント（部屋）を作成・管理するユーザーの情報です。

| カラム名        | データ型              | 説明                                             |
| :-------------- | :-------------------- | :----------------------------------------------- |
| `id`            | INT (AUTO\_INCREMENT) | **主キー (PK)**。管理者の一意なID。              |
| `username`      | VARCHAR(255)          | ログインに使用するユーザー名。UNIQUE制約を付与。 |
| `password_hash` | VARCHAR(255)          | ハッシュ化されたパスワード。                     |
| `created_at`    | TIMESTAMP             | アカウント作成日時。                             |
| `updated_at`    | TIMESTAMP             | 最終更新日時。                                   |

\<br\>

### 2\. 部屋テーブル (`Rooms`)

各オンラインイベントのコンテナとなる「部屋」の情報です。共有URLや進行状況を管理します。

| カラム名                | データ型                   | 説明                                                                 |
| :---------------------- | :------------------------- | :------------------------------------------------------------------- |
| `id`                    | INT (AUTO\_INCREMENT)      | **主キー (PK)**。部屋の一意なID。                                    |
| `admin_id`              | INT                        | **外部キー (FK)**。この部屋を作成した`Admins(id)`。                  |
| `room_slug`             | VARCHAR(255)               | **URL共有用の文字列**。ランダムな文字列など。UNIQUE制約。            |
| `title`                 | VARCHAR(255)               | イベントのタイトル。例：「2025年度キックオフミーティング」           |
| `status`                | ENUM('active', 'archived') | 部屋の状態。`active`: 進行中, `archived`: 締切済・アーカイブ。       |
| `show_respondent_names` | BOOLEAN                    | 回答者名の表示/非表示設定。管理者が切り替える。デフォルトは`false`。 |
| `current_poll_id`       | INT                        | 現在進行中の`Polls(id)`。進行中でなければNULL。 **外部キー (FK)**。  |
| `created_at`            | TIMESTAMP                  | 部屋の作成日時。                                                     |
| `updated_at`            | TIMESTAMP                  | 最終更新日時。                                                       |

\<br\>

### 3\. アンケートテーブル (`Polls`)

部屋の中で作成される個々のアンケート（質問）の情報です。

| カラム名                 | データ型                            | 説明                                                                              |
| :----------------------- | :---------------------------------- | :-------------------------------------------------------------------------------- |
| `id`                     | INT (AUTO\_INCREMENT)               | **主キー (PK)**。アンケートの一意なID。                                           |
| `room_id`                | INT                                 | **外部キー (FK)**。このアンケートが属する`Rooms(id)`。                            |
| `question`               | TEXT                                | アンケートの質問文。                                                              |
| `type`                   | ENUM('choice', 'scale', 'text')     | アンケートの種類。`choice`: 選択式, `scale`: 段階式, `text`: 自由記述。           |
| `allow_multiple_answers` | BOOLEAN                             | `type`が`choice`の場合に、複数回答を許可するかどうか。                            |
| `display_order`          | INT                                 | 部屋の中でのアンケートの表示順。                                                  |
| `status`                 | ENUM('waiting', 'active', 'closed') | アンケートの進行状態。`waiting`: 待機中, `active`: 回答受付中, `closed`: 締切済。 |
| `created_at`             | TIMESTAMP                           | アンケート作成日時。                                                              |

\<br\>

### 4\. 選択肢テーブル (`PollOptions`)

選択式・段階式アンケートの「選択肢」や「段階ラベル」の情報です。自由記述アンケートではこのテーブルは使用しません。

| カラム名        | データ型              | 説明                                                                                   |
| :-------------- | :-------------------- | :------------------------------------------------------------------------------------- |
| `id`            | INT (AUTO\_INCREMENT) | **主キー (PK)**。選択肢の一意なID。                                                    |
| `poll_id`       | INT                   | **外部キー (FK)**。この選択肢が属する`Polls(id)`。                                     |
| `label`         | VARCHAR(255)          | 選択肢のテキスト、または段階式のラベル。例：「とても満足」「はい」「改善が必要」など。 |
| `scale_value`   | INT                   | 段階式の場合の段階値（1〜10）。選択式の場合はNULLでよい。                              |
| `display_order` | INT                   | 選択肢の表示順。                                                                       |

\<br\>

### 5\. 回答テーブル (`Answers`)

参加者からの個々の回答データです。このテーブルが最も頻繁に書き込みされます。

| カラム名           | データ型                 | 説明                                                                                                               |
| :----------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `id`               | BIGINT (AUTO\_INCREMENT) | **主キー (PK)**。回答の一意なID。書き込みが多いためBIGINTを推奨。                                                  |
| `poll_id`          | INT                      | **外部キー (FK)**。回答対象の`Polls(id)`。                                                                         |
| `participant_id`   | VARCHAR(255)             | **回答者の一時的な識別子**。ログイン不要のため、クライアント側で生成・保持するUUIDなどを想定。重複投稿防止に利用。 |
| `participant_name` | VARCHAR(255)             | 回答者が任意で入力した名前。NULL許容。                                                                             |
| `option_id`        | INT                      | **外部キー (FK)**。選択式・段階式で選ばれた`PollOptions(id)`。自由記述の場合はNULL。                               |
| `text_answer`      | TEXT                     | 自由記述の回答内容。選択式・段階式の場合はNULL。                                                                   |
| `created_at`       | TIMESTAMP                | 回答日時。                                                                                                         |

-----

## テーブル間の関係と補足事項

  * **管理者と部屋**: 1人の`Admin`が複数の`Room`を作成できます (`1対多`)。
  * **部屋とアンケート**: 1つの`Room`に複数の`Poll`が含まれます (`1対多`)。
  * **アンケートと選択肢**: 1つの`Poll`（選択式・段階式）に複数の`PollOption`が紐付きます (`1対多`)。
  * **アンケートと回答**: 1つの`Poll`に対して複数の`Answer`が投稿されます (`1対多`)。
  * **回答者の識別**: `Answers.participant_id`が重要です。ユーザーが初めてイベントに参加した際にクライアント（ブラウザのlocalStorageなど）でUUIDを生成し、サーバーに送信するたびにこのIDを付与します。これにより、同じユーザーからの回答であることを識別し、「1つのアンケートに1回しか回答できない」といった制御をアプリケーション側で実装します。
  * **複数回答の扱い**: `Polls.allow_multiple_answers`が`true`の場合、同じ`participant_id`と`poll_id`の組み合わせで、`option_id`が異なる`Answer`レコードが複数作成されることになります。
  * **リアルタイム集計**: `Answers`テーブルを`poll_id`と`option_id`でグループ化してカウント(`COUNT`)することで、リアルタイムの投票結果を算出できます。この集計結果をSocket.io経由で全クライアントにブロードキャストします。