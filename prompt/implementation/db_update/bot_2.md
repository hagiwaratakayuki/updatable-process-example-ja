---
## 自由記述 (Text) 回答テーブル

| カラム名             | データ型                | 説明                                                             |
| :------------------- | :---------------------- | :--------------------------------------------------------------- |
| **id**               | BIGINT (AUTO_INCREMENT) | 主キー (PK)。回答の一意なID。書き込みが多いためBIGINTを推奨。    |
| **poll_id**          | INT                     | 外部キー (FK)。回答対象のPolls(id)。                             |
| **participant_id**   | VARCHAR(255)            | 回答者の一時的な識別子。クライアント側で生成・保持するUUIDなど。 |
| **participant_name** | VARCHAR(255)            | 回答者が任意で入力した名前。NULL許容。                           |
| **text_answer**      | TEXT                    | 自由記述の回答内容。                                             |
| **created_at**       | TIMESTAMP               | 回答日時。                                                       |

---
## 選択式 (Option) 回答テーブル

| カラム名             | データ型                | 説明                                                             |
| :------------------- | :---------------------- | :--------------------------------------------------------------- |
| **id**               | BIGINT (AUTO_INCREMENT) | 主キー (PK)。回答の一意なID。書き込みが多いためBIGINTを推奨。    |
| **poll_id**          | INT                     | 外部キー (FK)。回答対象のPolls(id)。                             |
| **participant_id**   | VARCHAR(255)            | 回答者の一時的な識別子。クライアント側で生成・保持するUUIDなど。 |
| **participant_name** | VARCHAR(255)            | 回答者が任意で入力した名前。NULL許容。                           |
| **option_id**        | INT                     | 外部キー (FK)。選択式・段階式で選ばれたPollOptions(id)。         |
| **created_at**       | TIMESTAMP               | 回答日時。                                                       |