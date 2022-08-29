import type { Dispatch } from 'react'
import type { TUser } from './User'

export type TState = {
  user: TUser
  misc: { appLoading: boolean }
  error: string
  alertMessage: string
}

export type TContext = {
  state: TState
  dispatch: Dispatch<TAction>
  autoLogin(): Promise<void>
}

// map for action types matching payload types
export type TPayloadMap = {
  setUser: TUser
  setAppLoading: boolean
  setError: string
  clearError: undefined
  setAlert: string
  clearAlert: undefined
  resetState: undefined
}
export type TActionType = keyof TPayloadMap

// to provide type support for each action objects
export type TAction<T extends TActionType = TActionType> = T extends T
  ? {
      type: T
      payload: TPayloadMap[T]
    }
  : never
