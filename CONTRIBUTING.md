# Contributing

## Browser Internals

To debug or identify the appropriate preferences to set, you can use the special browser URLs.

### Chromium browsers 

Stored in `preferences` object viewable at:

- Edge: [edge://prefs-internals/](edge://prefs-internals/)
- Chrome: [chrome://prefs-internals/](chrome://prefs-internals/)

#### `managed_content_setting_values`

Stores "managed" permissions. When a Chrome profile is managed by an organization, settings will take effect here.

#### `default_content_setting_values`

Stores "default" permissions. When a Chromium profile is "unmanaged", settings will take effect here.

### Firefox: 

Visit [about:profiles](about:profiles) in Firefox to see paths where profile is stored.

Open the files with an editor to see the internals.