import { hash, compare } from "bcryptjs";

import { db } from "./db.server";

const pepper = process.env.PEPPER;
if (!pepper) {
  throw new Error('PEPPER is not set!');
}

async function hashPassword(password: string) {
  const pepper = process.env.PEPPER;
  if (!pepper) {
    throw new Error('PEPPER is not defined!');
  }
  const hashedPassword = await hash(`${pepper}${password}`, 16);
  return hashedPassword;
}

type LoginForm = {
  username: string;
  password: string;
}

export async function register({ username, password }: LoginForm) {
  const existingUser = await db.user.findUnique({ where: { username } });
  if (existingUser) {
    return null;
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { username, passwordHash },
  });
  return { id: user.id, username };
}

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findUnique({ where: { username } });
  if (!user) {
    return null;
  }

  const isCorrectPassword = await compare(`${pepper}${password}`, user.passwordHash);
  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, username };
}