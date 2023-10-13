import { COOKIE } from "constants/cookie";
import { env } from "env";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

export const getUidCookie = (c: Context) => {
  const userId = getCookie(c, COOKIE.UID);

  if (!userId) {
    return null;
  }

  return userId;
};

export const DefaultUidCookieOption: CookieOptions = {
  path: "/",
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 60,
  expires: new Date(new Date("2023-11-06T00:00:00+09:00").getTime()),
  sameSite: "Lax",
  domain: env.DOMAIN,
};

export const getUid = (c: Context) => {
  const userId = getUidCookie(c);

  const auth = c.req.header("Authorization");
  const re = new RegExp("^Bearer (.*)$");
  const match = re.exec(auth ?? "");
  const token = match?.[1];

  return token ?? userId;
};

export const setUidCookie = async (
  c: Context,
  userId: string,
  option?: CookieOptions,
) => {
  const cookieOption = DefaultUidCookieOption ?? option;
  setCookie(c, COOKIE.UID, userId, cookieOption);
};

export const deleteUidCookie = (c: Context, option?: CookieOptions) => {
  const cookieOption = DefaultUidCookieOption ?? option;
  deleteCookie(c, COOKIE.UID, cookieOption);
};
