import { setJwtToken } from 'utils'

export default function ErrorPage() {
  const resetEverything = () => {
    setJwtToken('')
    window.location.reload()
  }
  return (
    <div className="grid fixed inset-0 place-items-center">
      <div className="text-center">
        <p className="mb-4 text-xl">Something went wrong</p>
        <button className="btn btn-error" onClick={resetEverything}>
          Reset Everything
        </button>
      </div>
    </div>
  )
}
