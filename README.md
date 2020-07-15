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

A Cypress plugin to manage browser launch permissions for various APIs such as Notifications, Geolocation, Cookies, and more.

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
const initializeBrowserPermissionsPlugin = require('cypress-browser-permissions/plugin');

module.exports = (on, config) => {
    initializeBrowserPermissionsPlugin(on, config);
};
```

#### Set your desired permissions

Setting permissions should work in Chrome, Edge (Chromium), and Firefox. They won't take effect in Electron or other browsers.

In `cypress.json` or `cypress.env.json`, you can use Cypress environment variables to control permissions:

```js
{
    "env": {
        "plugin_permissions_notifications": "allow",
        "plugin_permissions_geolocation": "block",
        "plugin_permissions_images": "ask",
    }
}
```

Values can be any of the following:

- `0` or `ask` - The default permission, which is to prompt the user
- `1` or `allow` - Allow the permission
- `2` or `block` - Block the permission

## Supported Permissions

### Chrome

- `notifications`
- `geolocation`

## Credits


## MIT License

See [LICENSE](LICENSE)