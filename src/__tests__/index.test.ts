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
      envSpy.mockReturnValue('allow')
      const permission = getBrowserPermission('notifications')
      expect(envSpy).toHaveBeenCalledWith('browser_permissions_notifications')
      expect(permission).toBe(PermissionState.allow)
    })

    it('should return undefined if no permission exists in Cypress env', () => {
      envSpy.mockReturnValue(undefined)
      const permission = getBrowserPermission('notifications')
      expect(envSpy).toHaveBeenCalledWith('browser_permissions_notifications')
      expect(permission).toBeUndefined()
    })
  })

  describe('isPermissionAllowed', () => {
    it('should return true if permission is "allow"', () => {
      envSpy.mockReturnValueOnce('allow')
      envSpy.mockReturnValueOnce('1')
      expect(isPermissionAllowed('notifications')).toBe(true)
      expect(isPermissionAllowed('notifications')).toBe(true)
    })

    it('should return false if permission is not "allow"', () => {
      envSpy.mockReturnValueOnce('block')
      envSpy.mockReturnValueOnce('ask')
      envSpy.mockReturnValueOnce('2')
      envSpy.mockReturnValueOnce('0')
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
      expect(isPermissionAllowed('notifications')).toBe(false)
    })
  })

  describe('isPermissionBlocked', () => {
    it('should return true if permission is "block"', () => {
      envSpy.mockReturnValueOnce('block')
      envSpy.mockReturnValueOnce('2')
      expect(isPermissionBlocked('notifications')).toBe(true)
      expect(isPermissionBlocked('notifications')).toBe(true)
    })

    it('should return false if permission is not "block"', () => {
      envSpy.mockReturnValueOnce('allow')
      envSpy.mockReturnValueOnce('ask')
      envSpy.mockReturnValueOnce('1')
      envSpy.mockReturnValueOnce('0')
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
      expect(isPermissionBlocked('notifications')).toBe(false)
    })
  })

  describe('isPermissionAsk', () => {
    it('should return true if permission is "ask"', () => {
      envSpy.mockReturnValueOnce('ask')
      envSpy.mockReturnValueOnce('0')
      expect(isPermissionAsk('notifications')).toBe(true)
      expect(isPermissionAsk('notifications')).toBe(true)
    })

    it('should return false if permission is not "ask"', () => {
      envSpy.mockReturnValueOnce('allow')
      envSpy.mockReturnValueOnce('block')
      envSpy.mockReturnValueOnce('1')
      envSpy.mockReturnValueOnce('2')
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
      expect(isPermissionAsk('notifications')).toBe(false)
    })
  })

  describe('isPermission', () => {
    it('should return true if permission matches state', () => {
      envSpy.mockReturnValueOnce('allow')
      expect(isPermission('notifications', PermissionState.allow)).toBe(true)
    })

    it('should return false if permission does not match state', () => {
      envSpy.mockReturnValueOnce('allow')
      expect(isPermission('notifications', PermissionState.block)).toBe(false)
    })
  })
})
