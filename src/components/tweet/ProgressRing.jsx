// no typescript because style variables errors.
export default function ProgressRing({ letterCount = 0 }) {
  const value = Math.floor(((280 - letterCount) * 100) / 280)
  let textColorClassname = 'text-primary'
  if (value <= 50) {
    textColorClassname = 'text-warning'
  }
  if (value <= 20) {
    textColorClassname = 'text-error'
  }

  return letterCount > 280 ? (
    <span className={`mx-2 text-error`}>-{letterCount - 280}</span>
  ) : (
    <div
      className={`text-xs radial-progress ${textColorClassname}`}
      style={{ '--value': value, '--size': '2rem', '--thickness': '8%' }}
    >
      {280 - letterCount}
    </div>
  )
}
