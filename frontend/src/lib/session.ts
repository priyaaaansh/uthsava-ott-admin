export type AuthSession = Record<string, unknown> & {
  token: string;
  refreshToken?: string;
  email?: string;
  role?: string;
  roleName?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  permissions?: Record<string, any>;
  customPermissions?: Record<string, any>;
};

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const LOGOUT_FLAG_KEY = "uthsava_explicit_logout";

export const DEV_ADMIN_SESSION: AuthSession = {
  token: "mock-dev-admin-token-2026",
  refreshToken: "mock-dev-admin-refresh-token",
  email: "admin@uthsava.com",
  firstName: "Admin",
  lastName: "User",
  fullName: "Admin User",
  role: "admin",
  roleName: "Super Admin",
  status: "active",
  adminId: "660000000000000000000001",
  _id: "660000000000000000000001",
  permissions: {
    dashboard: { all: true, view: true, create: true, edit: true, delete: true },
    contents: { all: true, view: true, create: true, edit: true, delete: true },
    movies: { all: true, view: true, create: true, edit: true, delete: true },
    series: { all: true, view: true, create: true, edit: true, delete: true },
    content_approval: { all: true, view: true, create: true, edit: true, delete: true },
    contentApproval: { all: true, view: true, create: true, edit: true, delete: true },
    categories: { all: true, view: true, create: true, edit: true, delete: true },
    users: { all: true, view: true, create: true, edit: true, delete: true },
    producers: { all: true, view: true, create: true, edit: true, delete: true },
    subadmins: { all: true, view: true, create: true, edit: true, delete: true },
    sub_admins: { all: true, view: true, create: true, edit: true, delete: true },
    roles: { all: true, view: true, create: true, edit: true, delete: true },
    plans: { all: true, view: true, create: true, edit: true, delete: true },
    subscriptions: { all: true, view: true, create: true, edit: true, delete: true },
    coupons: { all: true, view: true, create: true, edit: true, delete: true },
    payouts: { all: true, view: true, create: true, edit: true, delete: true },
    producer_payouts: { all: true, view: true, create: true, edit: true, delete: true },
    transactions: { all: true, view: true, create: true, edit: true, delete: true },
    earnings: { all: true, view: true, create: true, edit: true, delete: true },
    auditLogs: { all: true, view: true, create: true, edit: true, delete: true },
    activity_logs: { all: true, view: true, create: true, edit: true, delete: true },
    cms: { all: true, view: true, create: true, edit: true, delete: true },
    cms_pages: { all: true, view: true, create: true, edit: true, delete: true },
    settings: { all: true, view: true, create: true, edit: true, delete: true },
    notifications: { all: true, view: true, create: true, edit: true, delete: true },
    support: { all: true, view: true, create: true, edit: true, delete: true },
    devices: { all: true, view: true, create: true, edit: true, delete: true },
  },
  customPermissions: {
    dashboard: { all: true, view: true, create: true, edit: true, delete: true },
    contents: { all: true, view: true, create: true, edit: true, delete: true },
    movies: { all: true, view: true, create: true, edit: true, delete: true },
    series: { all: true, view: true, create: true, edit: true, delete: true },
    content_approval: { all: true, view: true, create: true, edit: true, delete: true },
    contentApproval: { all: true, view: true, create: true, edit: true, delete: true },
    categories: { all: true, view: true, create: true, edit: true, delete: true },
    users: { all: true, view: true, create: true, edit: true, delete: true },
    producers: { all: true, view: true, create: true, edit: true, delete: true },
    subadmins: { all: true, view: true, create: true, edit: true, delete: true },
    sub_admins: { all: true, view: true, create: true, edit: true, delete: true },
    roles: { all: true, view: true, create: true, edit: true, delete: true },
    plans: { all: true, view: true, create: true, edit: true, delete: true },
    subscriptions: { all: true, view: true, create: true, edit: true, delete: true },
    coupons: { all: true, view: true, create: true, edit: true, delete: true },
    payouts: { all: true, view: true, create: true, edit: true, delete: true },
    producer_payouts: { all: true, view: true, create: true, edit: true, delete: true },
    transactions: { all: true, view: true, create: true, edit: true, delete: true },
    earnings: { all: true, view: true, create: true, edit: true, delete: true },
    auditLogs: { all: true, view: true, create: true, edit: true, delete: true },
    activity_logs: { all: true, view: true, create: true, edit: true, delete: true },
    cms: { all: true, view: true, create: true, edit: true, delete: true },
    cms_pages: { all: true, view: true, create: true, edit: true, delete: true },
    settings: { all: true, view: true, create: true, edit: true, delete: true },
    notifications: { all: true, view: true, create: true, edit: true, delete: true },
    support: { all: true, view: true, create: true, edit: true, delete: true },
    devices: { all: true, view: true, create: true, edit: true, delete: true },
  },
};

function isBrowser() {
  return typeof window !== "undefined";
}

function clearStorage(storage: Storage) {
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
  storage.removeItem(USER_KEY);
}

/**
 * Initializes a demo/dev session so the application can be explored and tested
 * without requiring official credentials.
 */
export function initDevSession() {
  if (!isBrowser()) return DEV_ADMIN_SESSION;
  try {
    localStorage.removeItem(LOGOUT_FLAG_KEY);
  } catch {}
  saveSession(DEV_ADMIN_SESSION, true);
  return DEV_ADMIN_SESSION;
}

/** Returns a token from either a remembered or a browser-session login. */
export function getAccessToken(): string | null {
  if (!isBrowser()) return null;

  const token = localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  if (token) return token;

  // If no official credentials exist and user hasn't explicitly logged out,
  // automatically provide the dev admin token so the site works immediately.
  const isExplicitLogout = localStorage.getItem(LOGOUT_FLAG_KEY) === "true";
  if (!isExplicitLogout) {
    initDevSession();
    return DEV_ADMIN_SESSION.token;
  }

  return null;
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

export function getStoredUser(): AuthSession | null {
  if (!isBrowser()) return DEV_ADMIN_SESSION;

  const serializedUser = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);

  if (serializedUser) {
    try {
      return JSON.parse(serializedUser) as AuthSession;
    } catch {
      // fallback
    }
  }

  if (isAuthenticated()) {
    return DEV_ADMIN_SESSION;
  }

  return null;
}

export function saveSession(session: AuthSession, rememberMe: boolean) {
  if (!isBrowser()) return;

  clearSession();

  try {
    localStorage.removeItem(LOGOUT_FLAG_KEY);
  } catch {}

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, session.token);

  if (typeof session.refreshToken === "string") {
    storage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  }

  storage.setItem(USER_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) return;

  clearStorage(localStorage);
  clearStorage(sessionStorage);
}
