import { forOwn, set, unset, keys, pickBy, camelCase, mapKeys } from 'lodash'
import { PermissionState } from './types'
import {
  getBrowserPermissionsFromEnv,
  getBrowserLaunchOptionsPermissionsPath,
  getBrowserLaunchOptionsPermissionsContainerPath,
} from './helpers'
import { PLUGIN_ENV_VAR } from './constants'

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

/**
 * Automatically handle nested env overrides if passed from outside Cypress, such as when passing CYPRESS_browser_preferences_notifications
 *
 * @param config
 */
export function modifyAndTransformPluginEnv({ env }: Pick<Cypress.PluginConfigOptions, 'env'>) {
  // find keys that include browserPermissions prefix
  const envOverrides = pickBy(
    env,
    (_, key) => camelCase(key).startsWith(PLUGIN_ENV_VAR) && camelCase(key) !== PLUGIN_ENV_VAR,
  )

  // next, transform to permissions record to merge
  const permissionOverrides = mapKeys(envOverrides, (_, key) => {
    return camelCase(camelCase(key).replace(PLUGIN_ENV_VAR, ''))
  })

  // merge new permissions
  env.browserPermissions = {
    ...env.browserPermissions,
    ...permissionOverrides,
  }

  // unset original override keys
  keys(envOverrides).forEach((key) => unset(env, key))
}

export function cypressBrowserPermissionsPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  modifyAndTransformPluginEnv(config)
  on('before:browser:launch', onBeforeBrowserLaunch(config))
  return config
}
