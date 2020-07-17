export enum PermissionState {
  ask = 0,
  allow = 1,
  block = 2,
}

export interface BrowserPermissions {
  camera: PermissionState
  microphone: PermissionState
  notifications: PermissionState
  geolocation: PermissionState
  popups: PermissionState
  images: PermissionState
  javascript: PermissionState
  cookies: PermissionState
  plugins: PermissionState
}
