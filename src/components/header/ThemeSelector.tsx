export default function ThemeSelector() {
  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter'
  ]

  const changeTheme = (theme: string) => () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('html').dataset.theme = theme
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="flex items-center m-1 cursor-pointer">
        <span>themes</span>
      </div>
      <ul tabIndex={0} className="p-2 w-52 shadow menu dropdown-content bg-base-100 rounded-box">
        {themes.map((item) => (
          <li className="flex flex-row justify-center" key={item}>
            <span onClick={changeTheme(item)}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
