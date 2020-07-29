import { get, forOwn, set } from 'lodash'
import { onBeforeBrowserLaunch, modifyAndTransformPluginEnv } from '../plugin'
import { PermissionState } from '../types'
import { getBrowserLaunchOptionsPermissionsPath } from '../helpers'
import { PREFERENCES_ROOT_PATH_BY_FAMILY } from '../constants'

const EMPTY_LAUNCH_OPTIONS = {} as Cypress.BrowserLaunchOptions

describe('plugin', () => {
  describe('modifyAndTransformPluginEnv', () => {
    it('should transform camelCase overrides', () => {
      const config = {
        env: {
          browserPermissionsNotifications: 'allow',
        },
      }
      modifyAndTransformPluginEnv(config)
      expect(config).toEqual({
        env: {
          browserPermissions: {
            notifications: 'allow',
          },
        },
      })
    })

    it('should transform snake_case overrides', () => {
      const config = {
        env: {
          browser_permissions_notifications: 'allow',
        },
      }
      modifyAndTransformPluginEnv(config)
      expect(config).toEqual({
        env: {
          browserPermissions: {
            notifications: 'allow',
          },
        },
      })
    })

    it('should merge existing permissions if they exist', () => {
      const config = {
        env: {
          browserPermissions: {
            geolocation: 'block',
          },
          browserPermissionsNotifications: 'allow',
        },
      }
      modifyAndTransformPluginEnv(config)
      expect(config).toEqual({
        env: {
          browserPermissions: {
            geolocation: 'block',
            notifications: 'allow',
          },
        },
      })
    })

    it('should unset original keys', () => {
      const config = {
        env: {
          browserPermissionsNotifications: 'allow',
        },
      }
      modifyAndTransformPluginEnv(config)
      expect(config.env.browserPermissionsNotifications).toBeUndefined()
    })
  })

  describe('onBeforeBrowserLaunch', () => {
    forOwn(PREFERENCES_ROOT_PATH_BY_FAMILY, (_, browserFamily: Cypress.BrowserFamily) => {
      describe(`for browser family ${browserFamily}`, () => {
        function expectPermissionState(launchOptions: unknown, permission: string) {
          return expect(get(launchOptions, getBrowserLaunchOptionsPermissionsPath(browserFamily, permission)))
        }

        it('should handle "allow" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browserPermissions: {
                notifications: 'allow',
                geolocation: '1',
                images: 1,
              },
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.allow)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.allow)
          expectPermissionState(launchOptions, 'images').toBe(PermissionState.allow)
        })

        it('should handle "block" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browserPermissions: {
                notifications: 'block',
                geolocation: '2',
                images: 2,
              },
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.block)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.block)
          expectPermissionState(launchOptions, 'images').toBe(PermissionState.block)
        })

        it('should handle "ask" permissions', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browserPermissions: {
                notifications: 'ask',
                geolocation: '0',
                images: 0,
              },
            },
          })

          const launchOptions = handle({ family: browserFamily }, EMPTY_LAUNCH_OPTIONS)

          expectPermissionState(launchOptions, 'notifications').toBe(PermissionState.ask)
          expectPermissionState(launchOptions, 'geolocation').toBe(PermissionState.ask)
          expectPermissionState(launchOptions, 'images').toBe(PermissionState.ask)
        })

        it('should unset existing permissions if different ones are provided', () => {
          const handle = onBeforeBrowserLaunch({
            env: {
              browserPermissions: {
                notifications: 'allow',
              },
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

          set(initialLaunchOptions, geolocationPath, PermissionState.allow)

          const launchOptions = handle({ family: browserFamily }, initialLaunchOptions)

          expect(get(launchOptions, geolocationPath)).toBeUndefined()
        })
      })
    })
  })
})
