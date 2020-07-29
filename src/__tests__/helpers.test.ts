import { getBrowserPermissionsFromEnv, getBrowserLaunchOptionsPermissionsPath } from '../helpers'

describe('helpers', () => {
  describe('getBrowserPermissionsFromEnv', () => {
    it('should transform env record into permissions object', () => {
      expect(getBrowserPermissionsFromEnv({ browserPermissions: { notifications: 'allow' } })).toEqual({
        notifications: 1,
      })
    })

    it('should handle empty permissions', () => {
      expect(getBrowserPermissionsFromEnv({})).toEqual({})
    })
  })

  describe('getBrowserLaunchOptionsPermissionsPath', () => {
    it('should set Chromium notifications preferences path', () => {
      expect(getBrowserLaunchOptionsPermissionsPath('chromium', 'notifications')).toBe(
        'preferences.default.profile.managed_default_content_settings.notifications',
      )
    })

    it('should set Firefox notifications preferences path', () => {
      expect(getBrowserLaunchOptionsPermissionsPath('firefox', 'notifications')).toBe(
        'preferences.permissions.default.desktop-notification',
      )
    })
  })
})
