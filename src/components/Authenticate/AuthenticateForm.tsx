import { FormEventHandler, useState } from 'react'
import { client } from 'services/fetch'
import { useAppContext } from 'state/AppContext'
import type { TUser } from 'types'
import { setJwtToken } from 'utils'

type TAuthMode = 'login' | 'register'

type TLoginFields = { email: string; password: string }

type TRegisterFields = TLoginFields & { handle: string; name: string }

export default function AuthenticateForm() {
  const [authMode, setAuthMode] = useState<TAuthMode>('login')
  const [formState, setFormState] = useState<TRegisterFields>({
    handle: '',
    name: '',
    email: '',
    password: ''
  })

  const setField = (changes: Partial<TRegisterFields>) => {
    setFormState({ ...formState, ...changes })
  }

  const { dispatch } = useAppContext()

  const authenticate = (authArgs: TLoginFields | TRegisterFields) => {
    const endpoint = `/user/${authMode}`
    client<'user', TUser>(endpoint, 'post', authArgs)
      .then((data) => {
        setJwtToken(data.user.token)
        dispatch({ type: 'setUser', payload: data.user })
      })
      .catch((e: Record<string, string>) => {
        dispatch({ type: 'setAlert', payload: e.message })
      })
  }

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault()
    authenticate(formState)
  }

  return (
    <div className="m-auto max-w-prose">
      <form autoComplete="on" className="space-y-4" onSubmit={submitHandler}>
        {authMode === 'register' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              value={formState.handle}
              type="text"
              placeholder="username"
              className="input input-bordered"
              onChange={(e) => {
                setField({ handle: e.target.value })
              }}
            />
          </div>
        )}
        {authMode === 'register' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">name</span>
            </label>
            <input
              value={formState.name}
              type="text"
              placeholder="name"
              className="input input-bordered"
              onChange={(e) => {
                setField({ name: e.target.value })
              }}
            />
          </div>
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            value={formState.email}
            type="email"
            placeholder="email"
            className="input input-bordered"
            onChange={(e) => {
              setField({ email: e.target.value })
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            value={formState.password}
            type="password"
            placeholder="password"
            className="input input-bordered"
            onChange={(e) => {
              setField({ password: e.target.value })
            }}
          />
        </div>
        {authMode === 'login' ? (
          <div>
            Don&apos;t Have an Account?
            <span
              className="no-underline link link-primary"
              onClick={() => setAuthMode('register')}
            >
              Register
            </span>
          </div>
        ) : (
          <div>
            Already Have an Account?
            <span className="no-underline link link-primary" onClick={() => setAuthMode('login')}>
              Login
            </span>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <button className="btn btn-secondary" type="reset">
            Clear Fields
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
