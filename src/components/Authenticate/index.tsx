import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from 'state/AppContext'
import AuthenticateForm from './AuthenticateForm'

function AuthenticatePage() {
  const { state } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (state.user?.id) {
      navigate('/', {
        replace: true
      })
    }
  }, [state.user?.id, navigate])
  return <AuthenticateForm />
}

export default AuthenticatePage
