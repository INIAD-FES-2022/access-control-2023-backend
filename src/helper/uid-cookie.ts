import { COOKIE } from "constants/cookie";
import { env } from "env";
import { Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { CookieOptions } from "hono/utils/cookie";

export const getUidCookie = async (c: Context) => {
  const userId = await getSignedCookie(c, env.SECRET, COOKIE.UID);

  if (!userId) {
    return null;
  }

  return userId;
};

export const setUidCookie = async (
  c: Context,
  userId: string,
  option?: CookieOptions,
) => {
  const cookieOption = option ?? {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 60,
    expires: new Date(new Date("2023-11-06T00:00:00+09:00").getTime()),
    sameSite: "Lax",
  };

  await setSignedCookie(c, COOKIE.UID, userId, env.SECRET, cookieOption);
};

export const deleteUidCookie = (c: Context) => {
  deleteCookie(c, COOKIE.UID);
};
