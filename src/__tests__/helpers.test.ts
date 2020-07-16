import { getBrowserPermissionsFromEnv } from '../helpers'

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
})
