/* eslint-disable */
export type UserResponse = {
  id: string;

  /** 0: 10代以下, 1: 20代, 2: 30代, 3: 40代, 4: 50代, 5: 60代以上 */
  age: 0 | 1 | 2 | 3 | 4 | 5;

  /** 0: 男性, 1: 女性, 2: その他, 3: 無回答 */
  gender: 0 | 1 | 2 | 3;

  /** 0: 学生, 1: 会社員, 2: 自営業, 3: 主婦, 4: その他 */
  occupation: 0 | 1 | 2 | 3 | 4;

  /** 0: 地元, 1: その他 */
  home: 0 | 1;

  /** 同伴者の人数 */
  people: number;

  /** 0: 一人, 1: 家族（子どもあり）, 2: 家族（子どもなし）, 3: 学生グループ, 4: 恋人, 5: 友人, 6: その他 */
  composition: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export type UserRequest = {
  /** 0: 10代以下, 1: 20代, 2: 30代, 3: 40代, 4: 50代, 5: 60代以上 */
  age: 0 | 1 | 2 | 3 | 4 | 5;

  /** 0: 男性, 1: 女性, 2: その他, 3: 無回答 */
  gender: 0 | 1 | 2 | 3;

  /** 0: 学生, 1: 会社員, 2: 自営業, 3: 主婦, 4: その他 */
  occupation: 0 | 1 | 2 | 3 | 4;

  /** 0: 地元, 1: その他 */
  home: 0 | 1;

  /** 同伴者の人数 */
  people: number;

  /** 0: 一人, 1: 家族（子どもあり）, 2: 家族（子どもなし）, 3: 学生グループ, 4: 恋人, 5: 友人, 6: その他 */
  composition: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export type ProgramResponse = {
  id: string;
  name: string;
};

export type HistoryResponse = {
  id: string;
  entryTime: number;
  program: ProgramResponse;
};

export type ProgramsResponse = ProgramResponse[];
