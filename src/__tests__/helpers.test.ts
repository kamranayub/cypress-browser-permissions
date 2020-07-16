import { getBrowserPermissionsFromEnv } from '../helpers'

describe('helpers', () => {
  describe('getBrowserPermissionsFromEnv', () => {
    it('should transform env record into permissions object', () => {
      expect(getBrowserPermissionsFromEnv({ browser_permissions_notifications: 'allow' })).toEqual({
        notifications: 1,
      })
    })
  })
})
