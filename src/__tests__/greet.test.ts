import { greet } from '..'

test('My Greeter', () => {
  expect(greet('Carl')).toBe('Hello Carl')
})
