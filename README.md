# cypress-browser-permissions

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kamranayub/cypress-browser-permissions.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/kamranayub/cypress-browser-permissions.svg)
![npm](https://img.shields.io/npm/dw/cypress-browser-permissions.svg)
![npm](https://img.shields.io/npm/dm/cypress-browser-permissions.svg)
![npm](https://img.shields.io/npm/dy/cypress-browser-permissions.svg)
![npm](https://img.shields.io/npm/dt/cypress-browser-permissions.svg)
![NPM](https://img.shields.io/npm/l/cypress-browser-permissions.svg)
![npm](https://img.shields.io/npm/v/cypress-browser-permissions.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/kamranayub/cypress-browser-permissions.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/cypress-browser-permissions.svg)

A Cypress plugin to manage browser launch permissions for various APIs such as Notifications, Geolocation, Cookies, Images, and more.

![Video of notification being displayed](https://user-images.githubusercontent.com/563819/87746293-d254c400-c7b5-11ea-9d22-d5613b9dae47.gif)

These APIs can be controlled using browser profile preferences which this plugin will generate and pass for you, as well as resetting them for each test run (otherwise they will be persisted).

This enables you to effectively test permissions-based APIs in continuous integration environments and in headed browsers _without prompts._ :tada:

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
  - [Install the package](#install-the-package)
    - [npm](#npm)
    - [yarn](#yarn)
  - [Import and initialize the plugin](#import-and-initialize-the-plugin)
  - [Setting Permissions](#setting-permissions)
  - [In `cypress.json`](#in-cypressjson)
    - [In `cypress.env.json`](#in-cypressenvjson)
    - [Via `cypress open` or `cypress run`](#via-cypress-open-or-cypress-run)
    - [Via machine environment variables](#via-machine-environment-variables)
    - [Supported Permissions](#supported-permissions)
      - [Chrome / Edge (Chromium)](#chrome--edge-chromium)
      - [Firefox](#firefox)
  - [Supported Values](#supported-values)
  - [Checking Permissions](#checking-permissions)
    - [Usage Example](#usage-example)
- [API Reference](#api-reference)
- [Resetting Permissions](#resetting-permissions)
- [Details](#details)
  - [How It Works](#how-it-works)
  - [Chrome / Edge / Chromium Preferences](#chrome--edge--chromium-preferences)
  - [Firefox](#firefox-1)
- [Credits](#credits)
- [MIT License](#mit-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

> :wave: Read the [dev.to introduction post for a quick start guide and an example](https://dev.to/kamranayub/controlling-browser-permissions-in-cypress-end-to-end-tests-5d7b)!

### Install the package

#### npm

```bash
npm i cypress-browser-permissions --save-dev
```

#### yarn

```bash
yarn install cypress-browser-permissions --save-dev
```

### Import and initialize the plugin

In `cypress/plugins/index.js`:

**CommonJS**

```js
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')

module.exports = (on, config) => {
  // The plugin may modify the Cypress config, so be sure
  // to return it
  config = cypressBrowserPermissionsPlugin(on, config)

  //
  // Any existing plugins you are using
  //

  return config
}
```

**ES2015**

```js
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'

module.exports = (on, config) => {
  // The plugin may modify the Cypress config, so be sure
  // to return it
  config = cypressBrowserPermissionsPlugin(on, config)

  //
  // Any existing plugins you are using
  //

  return config
}
```

### Setting Permissions

Setting permissions should work in Chromium (Google Chrome, Microsoft Edge Chromium) and Firefox. They won't take effect in other browser families.

Permissions can be set using [Cypress environment variables](https://docs.cypress.io/guides/guides/environment-variables.html). The plugin reads permissions from `Cypress.env.browserPermissions` and supports all the existing ways to set Cypress environment variables.

![Example of enabling permissions](https://user-images.githubusercontent.com/563819/87628826-63b13100-c6f7-11ea-956a-ca84a137d464.png)

### In `cypress.json`

In `cypress.json`, set the `env.browserPermissions` property with a map of permissions:

```json
{
  "env": {
    "browserPermissions": {
      "notifications": "allow",
      "geolocation": "allow",
      "camera": "block",
      "microphone": "block",
      "images": "allow",
      "javascript": "allow",
      "popups": "ask",
      "plugins": "ask",
      "cookies": "allow"
    }
  }
}
```

#### In `cypress.env.json`

In `cypress.env.json`, it follows the same convention:

```json
{
  "browserPermissions": {
    "notifications": "allow",
    "geolocation": "allow",
    "camera": "block",
    "microphone": "block",
    "images": "allow",
    "javascript": "allow",
    "popups": "ask",
    "plugins": "ask",
    "cookies": "allow"
  }
}
```

#### Via `cypress open` or `cypress run`

Since the configuration is nested, you must pass in the permissions as a stringified JSON object:

```bash
$ cypress run  --env '{\"browserPermissions\": {\"notifications\": 1}}'
$ cypress open --env '{\"browserPermissions\": {\"notifications\": 1}}'
```

#### Via machine environment variables

By default, Cypress cannot handle nested variable objects but this plugin will correctly find environment variables that match what it expects and will translate them properly for you automatically:

```bash
CYPRESS_browser_permissions_notifications=allow cypress run
```

> **Remember:** When passing Cypress env vars from the outside, such as from a script, prefix them with `CYPRESS_` e.g. `CYPRESS_browser_permissions_notifications=allow`. Cypress automatically strips the prefix when passing to `Cypress.env`

#### Supported Permissions

These are the supported permission names of the plugin:

##### Chrome / Edge (Chromium)

- `notifications`
- `geolocation`
- `camera`
- `microphone`
- `images`
- `popups`
- `javascript`
- `cookies`
- `plugins`

##### Firefox

- `notifications`
- `geolocation`
- `camera`
- `microphone`
- `images`

### Supported Values

Values for a permission can be any of the following:

- `0` or `ask` - The default permission, which is to prompt the user
- `1` or `allow` - Allow the permission
- `2` or `block` - Block the permission

### Checking Permissions

In your Cypress test suites, you can import permissions helpers from the the package.

#### Usage Example

**my-test.spec.js**

```js
import { isPermissionAllowed, isPermissionBlocked, isPermissionAsk } from 'cypress-browser-permissions'

describe('my site', () => {
  before(() => cy.visit('/'))

  isPermissionAllowed('notifications') &&
    it('should show desktop notification', () => {
      /* ... */
    })

  isPermissionBlocked('notifications') &&
    it('should warn user desktop notifications are disabled', () => {
      /* ... */
    })

  isPermissionAsk('notifications') &&
    it('should prompt user to allow desktop notifications', () => {
      /* ... */
    })
})
```

Also see [cypress/integration/](cypress/integration) folder for e2e examples.

## API Reference

See [API reference](https://kamranicus.com/cypress-browser-permissions/modules/_index_.html) for documented methods.

## Resetting Permissions

This plugin automatically resets each supported permission to the browser default for each test run since otherwise profile preferences are persisted across sessions, which may not be what you intend.

## Details

### How It Works

Cypress can pass [preferences](https://docs.cypress.io/api/plugins/browser-launch-api.html#Modify-browser-launch-arguments-preferences-and-extensions) when launching browsers. This plugin adds a small abstraction over this low-level API to take care of setting the permission-related preferences in different browsers, mostly Chrome/Chromium and Firefox.

You can listen to the `before:browser:launch` event in your own Cypress application to add any additional preferences.

### Chrome / Edge / Chromium Preferences

Documented in [pref_names](https://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/pref_names.cc?view=markup), the permission-related preferences are grouped under `profile.managed_default_content_settings`.

These modify the "managed" settings, such as when group policy is enforced. In the Chrome settings, there _is_ a way to add specific sites to allow / block lists, and this may be possible to do with the plugin if that is stored in the profile data structure.

### Firefox

In `about:config` within Firefox, search for `permissions.default` to list permissions.

Notably, Firefox does not have some permissions related to JavaScript, Cookies, Plugins, and Popups but those may be managed with other settings.

## Credits

Thanks to BrowserStack for [documenting some of these permissions](https://www.browserstack.com/automate/handle-popups-alerts-prompts-in-automated-tests) as well as these StackOverflow posts:

- [Selenium + Python Allow Firefox Notifications](https://stackoverflow.com/questions/55435198/selenium-python-allow-firefox-notifications)
- [How to allow or deny notification geo-location microphone camera pop up](https://stackoverflow.com/questions/48007699/how-to-allow-or-deny-notification-geo-location-microphone-camera-pop-up)

In Web Driver testing, these are passed under capabilities, such as [shown in the test-runner configuration](https://webdriver.io/docs/configurationfile.html) and then passing as [shown here](https://stackoverflow.com/a/47654122/109458).

## MIT License

See [LICENSE](LICENSE)

```

```
