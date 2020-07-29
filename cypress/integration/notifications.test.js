import { isPermissionAllowed } from '../../dist'

describe('notifications', () => {
  it('should be enabled', () => {
    expect(isPermissionAllowed('notifications')).to.be.true
  })

  Cypress.browser.isHeaded &&
    it('should display desktop notification', () => {
      cy.visit('/cypress/html/show-notification.html')
      cy.get('#showNotification').click()
      cy.window().its('__CypressNotificationShown').should('exist')
      cy.window().its('__CypressNotificationShown.target.title').should('equal', 'test')
      cy.window().its('__CypressNotificationShown.target.body').should('equal', 'This is a test!')
    })
})
