import { BrowserPermissions } from './types'

export const PLUGIN_ENV_VAR = 'browserPermissions'

export const PREFERENCES_ROOT_PATH_BY_FAMILY: Record<Cypress.BrowserFamily, string> = {
  chromium: 'preferences.default',
  firefox: 'preferences',
}

export const PERMISSIONS_PREF_CONTAINER_BY_FAMILY: Record<Cypress.BrowserFamily, string> = {
  chromium: 'profile.managed_default_content_settings',
  firefox: 'permissions.default',
}

export const PERMISSIONS_PREF_NAME_BY_FAMILY: Record<
  Cypress.BrowserFamily,
  Record<keyof BrowserPermissions, string | undefined>
> = {
  chromium: {
    notifications: 'notifications',
    geolocation: 'geolocation',
    images: 'images',
    cookies: 'cookies',
    javascript: 'javascript',
    plugins: 'plugins',
    camera: 'media_stream',
    microphone: 'media_stream',
    popups: 'popups',
  },
  firefox: {
    camera: 'camera',
    microphone: 'microphone',
    notifications: 'desktop-notification',
    geolocation: 'geo',
    images: 'image',

    cookies: undefined,
    javascript: undefined,
    plugins: undefined,
    popups: undefined,
  },
}
