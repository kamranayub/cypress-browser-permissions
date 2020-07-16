import { PLUGIN_ENV_PREFIX } from './constants'
import { BrowserPermissions, PermissionState } from './types'
import { toPermissionState } from './helpers'

type PermissionKey = keyof BrowserPermissions

export function getBrowserPermission(permission: PermissionKey) {
  const permissionValue = Cypress.env(`${PLUGIN_ENV_PREFIX}${permission}`)

  if (permissionValue) {
    return toPermissionState(permissionValue)
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
