import { FunctionComponent, ReactElement } from 'react'

const Side: FunctionComponent<any> = ({ children, ...props }) => (
  <div className="w-full md:w-1/4" {...props}>
    {children}
  </div>
)

const Main: FunctionComponent<any> = ({ children, ...props }) => (
  <div className="w-full md:w-3/4" {...props}>
    {children}
  </div>
)

export default function PageLayout({ children }: { children: ReactElement[] }) {
  const side = children.find((el) => el.type === Side)
  const main = children.find((el) => el.type === Main)
  return (
    <div className="flex flex-col gap-8 items-start mx-auto mt-4 w-full sm:w-5/6 md:flex-row md:w-full">
      {side}
      {main}
    </div>
  )
}

PageLayout.Side = Side
PageLayout.Main = Main
