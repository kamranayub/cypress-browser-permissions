global.console = {
    log: jest.fn(), // console.log are ignored in tests
    info: jest.fn(),
  
    // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
    error: console.error,
    warn: console.warn,
    debug: console.debug,
  };