export function siteDomain() {
  const tdl = process.env.NODE_ENV === 'development' ? 'dev' : 'com'
  return `https://readfort.${tdl}`
}

/**
 * Pass path with leading slash
 * Ex.: pageUrl({ path: '/signin' })
 */
export function pageUrl({ path, domain }: { path: string; domain?: string }) {
  return `${domain ?? siteDomain()}${path}`
}

const SIGNIN_URL = '/signin'
const DASHBOARD_URL = '/dashboard'

export const ROUTES = {
  signin: {
    root: SIGNIN_URL,
    verify: `${SIGNIN_URL}/verify`,
    error: `${SIGNIN_URL}/error`,
    finish: `${SIGNIN_URL}/onboarding`,
  },
  dashboard: {
    root: DASHBOARD_URL,
  },
} as const
