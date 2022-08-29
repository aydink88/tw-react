import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Reducer } from 'react'
import { client } from 'services/fetch'
import type { TAction, TActionType, TContext, TState, TUser } from 'types'
import { getJwtToken } from 'utils'

const AppContext = createContext<TContext>({} as TContext)

const initialState = {
  misc: {},
  user: {},
  error: '',
  alertMessage: ''
} as TState

const appActions: { [T in TActionType]: (sta: TState, act: TAction<T> & any) => TState } = {
  setUser: (s, a) => ({ ...s, user: a.payload }),
  setAppLoading: (s, a) => ({ ...s, misc: { ...s.misc, appLoading: a.payload } }),
  setError: (s, a) => ({ ...s, error: a.payload }),
  setAlert: (s, a) => ({ ...s, alertMessage: a.payload }),
  clearError: (s) => ({ ...s, error: '' }),
  clearAlert: (s) => ({ ...s, alertMessage: '' }),
  resetState: () => initialState
}

const appReducer: Reducer<TState, TAction<TActionType>> = (state, action: TAction<TActionType>) => {
  return appActions[action.type](state, action)
}

export const AppProvider = ({ children }: { children: ReactNode | undefined }) => {
  // const [state, setState] = useState<TState>({} as TState)
  const [state, dispatch] = useReducer(appReducer, initialState)

  const autoLogin = async () => {
    dispatch({ type: 'setAppLoading', payload: true })
    if (!getJwtToken()) {
      dispatch({ type: 'setAppLoading', payload: false })

      return
    }
    try {
      const data = await client<'user', TUser>('/user/me')

      dispatch({ type: 'setUser', payload: data.user })

      // data.user?.token && localStorage.setItem('token', data.user.token)
    } catch (e: any) {
      e?.message && dispatch({ type: 'setError', payload: e.message })
    } finally {
      dispatch({ type: 'setAppLoading', payload: false })
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch, autoLogin }}>{children} </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)

  if (!ctx) {
    throw new Error('Context should be inside the provider')
  }

  return ctx
}
