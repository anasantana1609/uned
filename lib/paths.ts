import { safeRedirect } from "./model";
export const isStaticAuth = () =>
  process.env.NEXT_PUBLIC_AUTH_MODE === "static";
export function appPath(value: string) {
  const route = safeRedirect(value);
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${route}${isStaticAuth() && !route.includes("?") && !route.endsWith("/") ? "/" : ""}`;
}
export function authReturnUrl(origin: string) {
  return new URL(appPath("/auth/callback"), origin).href;
}
