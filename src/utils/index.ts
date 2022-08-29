import { tokenStorageItemName } from 'config'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getJwtToken() {
  return localStorage.getItem(tokenStorageItemName)
}

export function setJwtToken(token: string) {
  localStorage.setItem(tokenStorageItemName, token)
}
