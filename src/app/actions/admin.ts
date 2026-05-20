"use server";

import { redirect } from "next/navigation";
import { createAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/session";

export async function loginAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    return { success: false, error: "Credenciales de admin no configuradas en el servidor" };
  }

  if (username !== adminUser || password !== adminPass) {
    return { success: false, error: "Usuario o contraseña incorrectos" };
  }

  await createAdminSession();
  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
