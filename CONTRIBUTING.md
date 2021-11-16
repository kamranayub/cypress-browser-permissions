# Contributing

## Browser Internals

To debug or identify the appropriate preferences to set, you can use the special browser URLs.

### Chromium browsers 

Stored in `preferences` object viewable at:

- Edge: [edge://prefs-internals/](edge://prefs-internals/)
- Chrome: [chrome://prefs-internals/](chrome://prefs-internals/)

#### `managed_content_setting_values`

Stores "managed" permissions. Settings specified here will take effect when the profile is launched.

### Firefox: 

Visit [about:profiles](about:profiles) in Firefox to see paths where profile is stored.

Open the files with an editor to see the internals.