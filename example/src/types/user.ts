import { z } from "zod";

export const ageMap = {
  0: "10代以下",
  1: "20代",
  2: "30代",
  3: "40代",
  4: "50代",
  5: "60代以上",
} as const;

export const genderMap = {
  0: "男性",
  1: "女性",
  2: "その他",
  3: "未回答",
} as const;

export const occupationMap = {
  0: "学生",
  1: "会社員",
  2: "自営業",
  3: "主婦",
  4: "その他",
} as const;

export const homeMap = {
  0: "地元",
  1: "その他",
} as const;

export const compositionMap = {
  0: "一人",
  1: "家族（子どもあり）",
  2: "家族（子どもなし）",
  3: "学生グループ",
  4: "恋人",
  5: "友人",
  6: "その他",
} as const;

export const UserFormSchema = z.object({
  age: z.enum(["0", "1", "2", "3", "4", "5"], {
    required_error: "Please select age",
  }),
  gender: z.enum(["0", "1", "2", "3"], {
    required_error: "Please select gender",
  }),
  occupation: z.enum(["0", "1", "2", "3", "4"], {
    required_error: "Please select occupation",
  }),
  home: z.enum(["0", "1"], {
    required_error: "Please select home",
  }),
  people: z.string({
    required_error: "Please select people",
  }),
  composition: z.enum(["0", "1", "2", "3", "4", "5", "6"], {
    required_error: "Please select composition",
  }),
});

export const UserRequestSchema = z.object({
  age: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  gender: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  occupation: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  home: z.union([z.literal(0), z.literal(1)]),
  people: z.number(),
  composition: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
});
