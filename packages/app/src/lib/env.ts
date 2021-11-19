export const PRIVATE_KEY = (import.meta.env.VITE_HH_PK as string) || void 0
export const DEV_MODE = process.env.NODE_ENV === 'development'
