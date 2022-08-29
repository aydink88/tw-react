import { useAppContext } from 'state/AppContext'

export default function AlertNotifier() {
  const { state, dispatch } = useAppContext()
  const clearErrors = () => {
    dispatch({ type: 'clearAlert', payload: undefined })
  }

  if (!state.alertMessage) {
    return null
  }

  return (
    <div className="fixed left-0 top-0 z-50 p-4 w-full">
      <div className="shadow-lg alert alert-error">
        <div>
          <span onClick={clearErrors}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span>{state.alertMessage}</span>
        </div>
      </div>
    </div>
  )
}
