import packageJson from "../../package.json";

export const APP_VERSION = packageJson.version;
export const APP_NAME = "My Walden Pond";

export function getVersionLabel(): string {
  return `v${APP_VERSION}`;
}

export function getFullVersionLabel(): string {
  return `${APP_NAME} v${APP_VERSION}`;
}
