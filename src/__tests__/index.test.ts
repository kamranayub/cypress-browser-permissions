/* eslint-disable @typescript-eslint/no-namespace */
import { getBrowserPermission, isPermissionAllowed, isPermissionBlocked, isPermissionAsk, isPermission } from '..'
import { PermissionState } from '../types'

describe('Cypress exported utilities', () => {
  let envSpy: jest.Mock

  beforeEach(() => {
    envSpy = jest.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.Cypress = {
      env: envSpy,
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getBrowserPermission', () => {
    it('should return permission from Cypress env', () => {
      envSpy.mockReturnValue({ notifications: 'allow' })
      const permission = getBrowserPermission('notifications')
      expect(permission).toBe(PermissionState.allow)
    })

    it('should return undefined if no plugin env exists in Cypress env', () => {
      envSpy.mockReturnValue(undefined)
      const permission = getBrowserPermission('notifications')
      expect(permission).toBeUndefined()
    })

    it('should return undefined if no permission exists in Cypress env', () => {
      envSpy.mockReturnValue({ geolocation: 'allow' })
      const permission = getBrowserPermission('notifications')
      expect(permission).toBeUndefined()
    })
  })

  describe('isPermissionAllowed', () => {
    it('should return true if permission is "allow"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'allow' })
      envSpy.mockReturnValueOnce({ notifications: '1' })
      envSpy.mockReturnValueOnce({ notifications: 1 })
      expect(isPermissionAllowed('notifications')).toBe(true)
      expect(isPermissionAllowed('notifications')).toBe(true)
      expect(isPermissionAllowed('notifications')).toBe(true)
    })

    it('should return false if permission is not "allow"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'block' })
      envSpy.mockReturnValueOnce({ notifications: 'ask' })
      envSpy.mockReturnValueOnce({ notifications: '2' })
      envSpy.mockReturnValueOnce({ notifications: '0' })
      envSpy.mockReturnValueOnce({ notifications: 2 })
      envSpy.mockReturnValueOnce({ notifications: 0 })
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
    })
  })

  describe('isPermissionBlocked', () => {
    it('should return true if permission is "block"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'block' })
      envSpy.mockReturnValueOnce({ notifications: '2' })
      envSpy.mockReturnValueOnce({ notifications: 2 })
      expect(isPermissionBlocked('notifications')).toBe(true)
      expect(isPermissionBlocked('notifications')).toBe(true)
      expect(isPermissionBlocked('notifications')).toBe(true)
    })

    it('should return false if permission is not "block"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'allow' })
      envSpy.mockReturnValueOnce({ notifications: 'ask' })
      envSpy.mockReturnValueOnce({ notifications: '1' })
      envSpy.mockReturnValueOnce({ notifications: '0' })
      envSpy.mockReturnValueOnce({ notifications: 1 })
      envSpy.mockReturnValueOnce({ notifications: 0 })
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
    })
  })

  describe('isPermissionAsk', () => {
    it('should return true if permission is "ask"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'ask' })
      envSpy.mockReturnValueOnce({ notifications: '0' })
      envSpy.mockReturnValueOnce({ notifications: 0 })
      expect(isPermissionAsk('notifications')).toBe(true)
      expect(isPermissionAsk('notifications')).toBe(true)
      expect(isPermissionAsk('notifications')).toBe(true)
    })

    it('should return false if permission is not "ask"', () => {
      envSpy.mockReturnValueOnce({ notifications: 'allow' })
      envSpy.mockReturnValueOnce({ notifications: 'block' })
      envSpy.mockReturnValueOnce({ notifications: '1' })
      envSpy.mockReturnValueOnce({ notifications: '2' })
      envSpy.mockReturnValueOnce({ notifications: 1 })
      envSpy.mockReturnValueOnce({ notifications: 2 })
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
    })
  })

  describe('isPermission', () => {
    it('should return true if permission matches state', () => {
      envSpy.mockReturnValueOnce({ notifications: 'allow' })
      expect(isPermission('notifications', PermissionState.allow)).toBe(true)
    })

    it('should return false if permission does not match state', () => {
      envSpy.mockReturnValueOnce({ notifications: 'allow' })
      expect(isPermission('notifications', PermissionState.block)).toBe(false)
    })
  })
})
