import './Spinner.css'

export default function Spinner({ fullpage = false }) {
  return <div className={`lds-dual-ring${fullpage ? ' lds-fullpage' : ''}`}></div>
}
