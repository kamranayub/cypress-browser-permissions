import { get, forOwn, set } from 'lodash'
import { onBeforeBrowserLaunch } from '../plugin'
import { PermissionState } from '../types'
import { getBrowserLaunchOptionsPermissionsPath, getBrowserLaunchOptionsPermissionsContainerPath } from '../helpers'
import { PREFERENCES_ROOT_PATH_BY_FAMILY } from '../constants'

const EMPTY_LAUNCH_OPTIONS = {} as Cypress.BrowserLaunchOptions

describe('plugin', () => {
  describe('onBeforeBrowserLaunch', () => {
    forOwn(PREFERENCES_ROOT_PATH_BY_FAMILY, (_, browserFamily: Cypress.BrowserFamily) => {
      describe(`for browser family ${browserFamily}`, () => {
        function expectPermissionState(launchOptions: unknown, permission: string) {
          return expect(get(launchOptions, getBrowserLaunchOptionsPermissionsPath(browserFamily, permission)))
        }

        it('should handle "allow" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browser_permissions_notifications: 'allow',
              browser_permissions_geolocation: '1',
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.allow)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.allow)
        })

        it('should handle "block" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browser_permissions_notifications: 'block',
              browser_permissions_geolocation: '2',
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.block)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.block)
        })

        it('should handle "ask" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browser_permissions_notifications: 'ask',
              browser_permissions_geolocation: '0',
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.ask)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.ask)
        })

        it('should unset existing permissions if different ones are provided', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browser_permissions_notifications: 'allow',
            },
          })

          const initialLaunchOptions = {} as Cypress.BrowserLaunchOptions
          const geolocationPath = getBrowserLaunchOptionsPermissionsPath(browserFamily, 'geolocation')
          const notificationsPath = getBrowserLaunchOptionsPermissionsPath(browserFamily, 'notifications')

          set(initialLaunchOptions, geolocationPath, PermissionState.allow)

          const launchOptions = handle({ family: browserFamily }, initialLaunchOptions)

          expect(get(launchOptions, geolocationPath)).toBeUndefined()
          expect(get(launchOptions, notificationsPath)).toBe(PermissionState.allow)
        })

        it('should unset existing permissions if none are provided', () => {
          const handle = onBeforeBrowserLaunch({
            env: {},
          })

          const initialLaunchOptions = {} as Cypress.BrowserLaunchOptions
          const geolocationPath = getBrowserLaunchOptionsPermissionsPath(browserFamily, 'geolocation')
          const containerPath = getBrowserLaunchOptionsPermissionsContainerPath(browserFamily)

          set(initialLaunchOptions, geolocationPath, PermissionState.allow)

          const launchOptions = handle({ family: browserFamily }, initialLaunchOptions)

          expect(get(launchOptions, geolocationPath)).toBeUndefined()
          expect(get(launchOptions, containerPath)).toBeUndefined()
        })
      })
    })
  })
})
