import { z } from "@hono/zod-openapi";

export const UserResponseSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: "00000000-0000-0000-0000-000000000000",
    }),
    age: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ])
      .openapi({
        example: 0,
        description:
          "0: 10代以下, 1: 20代, 2: 30代, 3: 40代, 4: 50代, 5: 60代以上",
      }),
    gender: z
      .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
      .openapi({
        example: 0,
        description: "0: 男性, 1: 女性, 2: その他, 3: 無回答",
      }),
    occupation: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
      ])
      .openapi({
        example: 0,
        description: "0: 学生, 1: 会社員, 2: 自営業, 3: 主婦, 4: その他",
      }),
    home: z.union([z.literal(0), z.literal(1)]).openapi({
      example: 0,
      description: "0: 地元, 1: その他",
    }),
    people: z.number().openapi({
      example: 1,
      description: "同伴者の人数",
    }),
    composition: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
      ])
      .openapi({
        example: 0,
        description:
          "0: 一人, 1: 家族（子どもあり）, 2: 家族（子どもなし）, 3: 学生グループ, 4: 恋人, 5: 友人, 6: その他",
      }),
  })
  .openapi("UserResponse");

export const UserRequestSchema = UserResponseSchema.omit({
  id: true,
}).openapi("UserRequest");
