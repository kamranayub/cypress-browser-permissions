import { forOwn, set, unset } from 'lodash'
import { PermissionState } from './types'
import {
  getBrowserPermissionsFromEnv,
  getBrowserLaunchOptionsPermissionsPath,
  getBrowserLaunchOptionsPermissionsContainerPath,
} from './helpers'

function resetBrowserPermissions(
  browser: Pick<Cypress.Browser, 'family'>,
  launchOptions: Cypress.BrowserLaunchOptions,
) {
  const path = getBrowserLaunchOptionsPermissionsContainerPath(browser.family)

  if (path) {
    unset(launchOptions, path)
  }
}

export function onBeforeBrowserLaunch(config: Pick<Cypress.PluginConfigOptions, 'env'>) {
  return (browser: Pick<Cypress.Browser, 'family'>, launchOptions: Cypress.BrowserLaunchOptions) => {
    // Allow overriding prefs via dynamic env variables
    const requestedPermissions = getBrowserPermissionsFromEnv(config.env)

    // By default, unset preferences Cypress doesn't set automatically
    resetBrowserPermissions(browser, launchOptions)

    // Set Chrome launchOptions preferences
    forOwn(requestedPermissions, (value: PermissionState, permission: string) => {
      const path = getBrowserLaunchOptionsPermissionsPath(browser.family, permission)

      if (path) {
        set(launchOptions, path, value)
      }
    })

    return launchOptions
  }
}

export default function initializeCypressBrowserPreferences(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) {
  on('before:browser:launch', onBeforeBrowserLaunch(config))
}
