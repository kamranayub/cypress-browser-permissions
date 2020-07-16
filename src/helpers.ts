import { isNumber, toNumber, chain, toLower } from 'lodash'
import { PermissionState, BrowserPermissions } from './types'
import {
  PLUGIN_ENV_PREFIX,
  PREFERENCES_ROOT_PATH_BY_FAMILY,
  PERMISSIONS_PREF_NAME_BY_FAMILY,
  PERMISSIONS_PREF_CONTAINER_BY_FAMILY,
} from './constants'

function isBrowserPermissionVar(_value: string, key: string) {
  return key.startsWith(PLUGIN_ENV_PREFIX)
}

export function toPermissionState(value: string): PermissionState {
  const maybeNumber = toNumber(value)

  if (isNumber(maybeNumber) && maybeNumber >= 0 && maybeNumber <= 2) {
    return maybeNumber
  }

  const lowerValue = value.toLowerCase()

  if (lowerValue === 'allow') {
    return PermissionState.allow
  } else if (lowerValue === 'block') {
    return PermissionState.block
  } else if (lowerValue === 'ask') {
    return PermissionState.ask
  } else {
    throw new TypeError('Cannot determine permission state from value: ' + value)
  }
}

export function getBrowserPermissionsFromEnv(env: Record<string, any>) {
  const permissionsRecord: unknown = chain(env)
    .mapKeys((_, key) => toLower(key))
    .pickBy(isBrowserPermissionVar)
    .mapKeys((_, key) => key.replace(PLUGIN_ENV_PREFIX, ''))
    .mapValues((value) => toPermissionState(value))
    .value()

  return permissionsRecord as BrowserPermissions
}

export function getBrowserLaunchOptionsPermissionsPath(browserFamily: Cypress.BrowserFamily, permission: string) {
  const rootPath = PREFERENCES_ROOT_PATH_BY_FAMILY[browserFamily]
  const containerPath = PERMISSIONS_PREF_CONTAINER_BY_FAMILY[browserFamily]
  const valuePath = PERMISSIONS_PREF_NAME_BY_FAMILY[browserFamily][permission]

  if (rootPath && containerPath && valuePath) {
    return `${rootPath}${containerPath}.${valuePath}`
  }
  return undefined
}

export function getBrowserLaunchOptionsPermissionsContainerPath(browserFamily: Cypress.BrowserFamily) {
  const rootPath = PREFERENCES_ROOT_PATH_BY_FAMILY[browserFamily]
  const containerPath = PERMISSIONS_PREF_CONTAINER_BY_FAMILY[browserFamily]

  if (rootPath && containerPath) {
    return `${rootPath}${containerPath}`
  }
  return undefined
}
