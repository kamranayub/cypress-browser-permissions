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

These APIs can be controlled using profile preferences which this plugin will generate and pass for you, as well as resetting them for each test run (otherwise they will be persisted).

## Usage

### Install the package

#### npm

```bash
npm i cypress-browser-permissions --save-dev
```

#### yarn

```bash
yarn install cypress-browser-permissions --save-dev
```

#### Import and initialize the plugin

In `cypress/plugins/index.js`:

```js
const initializeBrowserPermissionsPlugin = require('cypress-browser-permissions/plugin')

module.exports = (on, config) => {
  initializeBrowserPermissionsPlugin(on, config)
}
```

## Setting Permissions

Setting permissions should work in Chrome, Edge (Chromium), and Firefox. They won't take effect in Electron or other browsers.

Permission environment variables should begin with `plugin_permissions_` and then can be followed by any of the supported permissions listed below.

> **Remember:** When passing Cypress env vars from the outside, such as from a script, prefix them with `CYPRESS_` e.g. `CYPRESS_plugin_permissions_notifications=allow`.

### In `cypress.json`

In `cypress.json`, you can use Cypress environment variables to control permissions:

```js
{
    "env": {
        "plugin_permissions_notifications": "allow",
        "plugin_permissions_geolocation": "block",
        "plugin_permissions_images": "ask",
    }
}
```

### In `cypress.env.json`

In `cypress.env.json`, it follows the same convention:

```js
{
    "plugin_permissions_notifications": "allow",
    "plugin_permissions_geolocation": "block",
    "plugin_permissions_images": "ask",
}
```

### Via `cypress open` or `cypress run`

```bash
$ cypress run --env plugin_permissions_notifications=allow
$ cypress open --env plugin_permissions_notifications=allow
```

### Via machine environment variables

```bash
CYPRESS_plugin_permissions_notifications=allow cypress run
```

### Supported Permissions

These are the supported options of the plugin:

#### Chrome / Edge (Chromium)

- `notifications`
- `geolocation`
- `popups`
- `images`
- `javascript`
- `media_stream`
- `cookies`
- `plugins`

#### Firefox

- `notifications`
- `geolocation`
- `camera`
- `images`
- `microphone`

### Supported Values

Values for a permission can be any of the following:

- `0` or `ask` - The default permission, which is to prompt the user
- `1` or `allow` - Allow the permission
- `2` or `block` - Block the permission

## API

In your Cypress test suites, you can import permissions helpers from the the package.

### Usage Example

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

### Docs

See [API docs](https://kamranicus.com/cypress-browser-permissions)

## Resetting Permissions

This plugin automatically resets each supported permission to the browser default for each test run since otherwise profile preferences are persisted across sessions, which may not be what you intend.

## Details

### How It Works

Cypress can pass [preferences](https://docs.cypress.io/api/plugins/browser-launch-api.html#Modify-browser-launch-arguments-preferences-and-extensions) when launching browsers. This plugin adds a small abstraction over this low-level API to take care of setting the permission-related preferences in different browsers, mostly Chrome/Chromium and Firefox.

You can listen to the `before:browser:launch` event in your own Cypress application to add any additional preferences.

### Chrome / Chromium Preferences

Documented in [pref_names](https://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/pref_names.cc?view=markup), the permission-related preferences are grouped under `profile.managed_default_content_settings`.

### Firefox

In `about:config` within Firefox, search for `permissions.default` to list permissions.

## Credits

Thanks to BrowserStack for [documenting some of these permissions](https://www.browserstack.com/automate/handle-popups-alerts-prompts-in-automated-tests) as well as these StackOverflow posts:

- [Selenium + Python Allow Firefox Notifications](https://stackoverflow.com/questions/55435198/selenium-python-allow-firefox-notifications)
- [How to allow or deny notification geo-location microphone camera pop up](https://stackoverflow.com/questions/48007699/how-to-allow-or-deny-notification-geo-location-microphone-camera-pop-up)

In Web Driver testing, these are passed under capabilities, such as [shown in the test-runner configuration](https://webdriver.io/docs/configurationfile.html) and then passing as [shown here](https://stackoverflow.com/a/47654122/109458).

## MIT License

See [LICENSE](LICENSE)

```

```
