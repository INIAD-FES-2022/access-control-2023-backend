import type { History, Program, User } from "@prisma/client";

export const historyStore = new Map<string, History>();
export const programStore = new Map<string, Program>();
export const userStore = new Map<string, User>();
