# Access Control Backend

## 共通仕様

末尾のスラッシュの有無は区別しない。

具体的には以下の例に示すようなルートは同じものとして扱う。

- `/api/user`
- `/api/user/`

## モデル

### ユーザー

```typescript
interface User {
  id: string;
  age: 0 | 1 | 2 | 3 | 4 | 5;
  gender: 0 | 1 | 2 | 3;
  occupation: 0 | 1 | 2 | 3 | 4;
  home: 0 | 1;
  people: number;
  composition: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
```

#### `id`

一意の UUIDv4

#### `age`

年代

| id  | 年代      |
| --- | --------- |
| 0   | 10 代以下 |
| 1   | 20 代     |
| 2   | 30 代     |
| 3   | 40 代     |
| 4   | 50 代     |
| 5   | 60 代以上 |

#### `gender`

性別

| id  | 性別   |
| --- | ------ |
| 0   | 男性   |
| 1   | 女性   |
| 2   | その他 |
| 3   | 無回答 |

#### `occupation`

職業

| id  | 職業   |
| --- | ------ |
| 0   | 学生   |
| 1   | 会社員 |
| 2   | 自営業 |
| 3   | 主婦   |
| 4   | その他 |

#### `home`

出身地

| id  | 出身地 |
| --- | ------ |
| 0   | 地元   |
| 1   | その他 |

#### `people`

同伴者の人数

#### `composition`

同伴者の構成

| id  | 構成               |
| --- | ------------------ |
| 0   | 一人               |
| 1   | 家族（子どもあり） |
| 2   | 家族（子どもなし） |
| 3   | 学生グループ       |
| 4   | 恋人               |
| 5   | 友人               |
| 6   | その他             |

### 企画

```typescript
interface Program {
  id: string;
  name: string;
}
```

#### `id`

一意の UUIDv4

#### `name`

企画名

### 参加履歴

```typescript
interface History {
  id: string;
  entryTime: number;
  program: Program;
}
```

#### `id`

一意の UUIDv4

#### `entryTime`

参加時間

#### `program`

参加した企画

## ユーザーの識別について

本 API は以下の 2 通りによる方法でユーザーを識別する

- Cookie

  - リクエストヘッダの`Cookie`に`uid`としてユーザー ID を設定する

- Bearer 認証

  - リクエストヘッダの`Authorization`に`Bearer {uid}`としてユーザー ID を設定する

両方が設定された場合は Bearer 認証を用いる

## エンドポイント

### `/api/user`

#### GET

ユーザー自身の情報を取得する

##### レスポンス

`User`

```javascript
{
  id: "ユーザーID",
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

- 200 OK

  - ユーザー情報を返す

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 500 Internal Server Error

  - サーバー内部エラー

#### POST

ユーザーを作成する

##### リクエストボディ

`Omit<User, "id">`

```javascript
{
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

##### レスポンス

`User`

```javascript
{
  id: "ユーザーID",
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

- 200 OK

  - 作成されたユーザー情報を返す
  - Cookie に`uid`を付与する

- 400 Bad Request

  - リクエストボディが不正

- 403 Forbidden

  - 既にユーザーが作成済み（Cookie に`uid`が設定されている）

- 500 Internal Server Error

  - サーバー内部エラー

#### PUT

ユーザーの情報を更新する

##### リクエストボディ

`Omit<User, "id">`

```javascript
{
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

##### レスポンス

`User`

```javascript
{
  id: "ユーザーID",
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

- 200 OK

  - 更新されたユーザー情報を返す

- 400 Bad Request

  - リクエストボディが不正

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 500 Internal Server Error

  - サーバー内部エラー

#### DELETE

ユーザーを削除する

##### レスポンス

`User`

```javascript
{
  id: "ユーザーID",
  age: "年齢",
  gender: "性別",
  occupation: "職業",
  home: "出身",
  people: "人数",
  composition: "構成"
}
```

- 200 Ok

  - ユーザーが削除された

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 500 Internal Server Error

  - サーバー内部エラー

### `/api/enter/{programId}`

#### POST

ユーザーを企画に参加させる

##### レスポンス

`History`

```javascript
{
  id: "履歴ID",
  entryTime: "参加時間",
  program: {
    id: "企画ID",
    name: "企画名",
  }
}
```

- 200 OK

  - 作成された参加履歴を返す

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 404 Not Found

  - 企画が存在しない

- 500 Internal Server Error

  - サーバー内部エラー

### `/api/history`

#### GET

ユーザーが参加した企画一覧履歴を取得する

##### レスポンス

`History[]`

```javascript
[
  {
    id: "履歴ID",
    entryTime: "参加時間",
    program: {
      id: "企画ID",
      name: "企画名",
    }
  },
  ...
]
```

- 200 OK

  - 一覧履歴を返す

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 500 Internal Server Error

  - サーバー内部エラー

### `/api/history/{historyId}`

#### DELETE

ユーザーの参加履歴を削除する

##### レスポンス

`History`

```javascript
{
  id: "履歴ID",
  entryTime: "参加時間",
  program: {
    id: "企画ID",
    name: "企画名",
  }
}
```

- 200 Ok

  - 参加履歴が削除された

- 401 Unauthorized

  - ユーザーの識別情報が不正

- 404 Not Found

  - 参加履歴が存在しない

- 500 Internal Server Error

  - サーバー内部エラー

### `/api/program`

#### GET

企画一覧を取得する

##### レスポンス

`Program[]`

```javascript
[
  {
    id: "企画ID",
    name: "企画名",
  },
  ...
]
```

- 200 OK

  - 企画一覧を返す

- 500 Internal Server Error

  - サーバー内部エラー
