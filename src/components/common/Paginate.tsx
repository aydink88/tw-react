import { Dispatch, ReactNode, SetStateAction } from 'react'

export default function Paginate({
  children,
  page,
  setPage,
  isPreviousData
}: {
  children: ReactNode
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isPreviousData: boolean
}) {
  return (
    <>
      {children}
      <div className="flex justify-between items-center">
        <button
          className="btn btn-accent"
          onClick={() => {
            setPage((old) => Math.max(old - 1, 0))
            window.scrollTo({ top: 0 })
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <p>{page}</p>
        <button
          className="btn btn-accent"
          onClick={() => {
            if (!isPreviousData) {
              setPage((old) => old + 1)
              window.scrollTo({ top: 0 })
            }
          }}
          disabled={isPreviousData}
        >
          Next
        </button>
      </div>
    </>
  )
}
