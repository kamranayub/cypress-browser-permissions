import { PLUGIN_ENV_VAR } from './constants'
import { BrowserPermissions, PermissionState } from './types'
import { toPermissionState } from './helpers'
export { cypressBrowserPermissionsPlugin } from './plugin'

type PermissionKey = keyof BrowserPermissions

export function getBrowserPermission(permission: PermissionKey) {
  const permissions = Cypress.env(PLUGIN_ENV_VAR)

  if (permissions && typeof permissions[permission] !== 'undefined') {
    return toPermissionState(permissions[permission])
  } else {
    return undefined
  }
}

export function isPermissionAllowed(permission: PermissionKey) {
  return getBrowserPermission(permission) === PermissionState.allow
}

export function isPermissionBlocked(permission: PermissionKey) {
  return getBrowserPermission(permission) === PermissionState.block
}

export function isPermissionAsk(permission: PermissionKey) {
  return getBrowserPermission(permission) === PermissionState.ask
}

export function isPermission(permission: PermissionKey, state: PermissionState) {
  return getBrowserPermission(permission) === state
}
