import { createHash } from "crypto";

// Demo-grade auth: a single shared password gates /admin. Set ADMIN_PASSWORD
// in the environment to override the default before exposing this beyond
// your own machine.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "valkiria-admin";

export const ADMIN_COOKIE = "valkiria_admin_session";

export function getSessionToken(): string {
  return createHash("sha256")
    .update(`${ADMIN_PASSWORD}:valkiria-admin-session`)
    .digest("hex");
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  return !!token && token === getSessionToken();
}
