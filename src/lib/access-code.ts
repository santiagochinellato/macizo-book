import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;
const SALT_ROUNDS = 10;

export function generateAccessCode(): string {
  const bytes = randomBytes(CODE_LENGTH);
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[bytes[i]! % CODE_CHARS.length];
  }
  return code;
}

export async function hashAccessCode(code: string): Promise<string> {
  return bcrypt.hash(code.toUpperCase().trim(), SALT_ROUNDS);
}

export async function verifyAccessCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code.toUpperCase().trim(), hash);
}
