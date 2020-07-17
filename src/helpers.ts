import { isNumber, toNumber, chain, toLower } from 'lodash'
import { PermissionState, BrowserPermissions } from './types'
import {
  PREFERENCES_ROOT_PATH_BY_FAMILY,
  PERMISSIONS_PREF_NAME_BY_FAMILY,
  PERMISSIONS_PREF_CONTAINER_BY_FAMILY,
  PLUGIN_ENV_VAR,
} from './constants'

export function toPermissionState(value: any): PermissionState {
  const maybeNumber = toNumber(value)

  if (isNumber(maybeNumber) && maybeNumber >= 0 && maybeNumber <= 2) {
    return maybeNumber
  }

  const lowerValue = String(value).toLowerCase()

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

export function getBrowserPermissionsFromEnv(env: { browserPermissions?: Record<string, any> }) {
  const permissionsRecord: unknown = chain(env[PLUGIN_ENV_VAR])
    .mapKeys((_, key) => toLower(key))
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
