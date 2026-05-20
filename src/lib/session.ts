import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "md_admin_session";
const ACCESS_COOKIE_PREFIX = "md_access_";

function getSecretBytes(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

function getSecret(): Uint8Array {
  const secret = getSecretBytes();
  if (!secret) {
    throw new Error("SESSION_SECRET debe estar definido (mínimo 16 caracteres)");
  }
  return secret;
}

export async function createAdminSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = getSecretBytes();
  if (!secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function createPresentationAccess(slug: string): Promise<void> {
  const token = await new SignJWT({ slug })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(`${ACCESS_COOKIE_PREFIX}${slug}`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function hasPresentationAccess(slug: string): Promise<boolean> {
  const secret = getSecretBytes();
  if (!secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(`${ACCESS_COOKIE_PREFIX}${slug}`)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.slug === slug;
  } catch {
    return false;
  }
}

export function isSessionConfigured(): boolean {
  return getSecretBytes() !== null;
}
