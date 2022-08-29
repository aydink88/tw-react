import BaseCard from 'components/common/BaseCard'
import Paginate from 'components/common/Paginate'
import Spinner from 'components/common/Spinner'
import { defaultAvatar } from 'config'
import { useQuerySearchPeople } from 'hooks/fetchQueries'
import type { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { followProfileOf } from 'services/fetch'

export default function ExplorePeople({
  searchTerm,
  page,
  setPage
}: {
  searchTerm: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
}) {
  const { isLoading, isError, data, isPreviousData, isFetching } = useQuerySearchPeople({
    searchTerm,
    page
  })

  const queryClient = useQueryClient()
  const followMutation = useMutation(followProfileOf)

  const clickFollow = (handle: string) => {
    followMutation.mutate(handle, {
      onSuccess: () => queryClient.invalidateQueries('searchPeople')
    })
  }

  if (isLoading || isFetching) return <Spinner />

  if (isError) return <h1>Data fetching failed</h1>

  return (
    <>
      {data?.people.length ? (
        <Paginate isPreviousData={isPreviousData} page={page} setPage={setPage}>
          <BaseCard title="Found Profiles">
            {data.people.map((listMember) => (
              <div key={listMember.id}>
                <div className="flex items-center mb-4">
                  <div className="basis-1/4 follow-list-user">
                    <div className="flex follow-list-info">
                      <div className="p-2 w-20 h-20 avatar follow-list-avatar">
                        <img
                          className="mask mask-squircle"
                          src={listMember.avatar || defaultAvatar}
                          alt={listMember.name}
                        />
                      </div>
                      <div>
                        <Link to={`/profile/${listMember.handle}`}>
                          <h2 className="font-medium custom-title follow-list-name">
                            {listMember.name}
                          </h2>
                        </Link>
                        <div className="text-sm text-base-content/70 follow-list-count">
                          {listMember.followerCount || 0} {` followers`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2 p-2 w-full text-sm text-align-center text-base-content/70 follow-list-bio">
                    {listMember.bio}
                  </div>
                  <div className="basis-1/4 ml-auto follow-list-button">
                    <button className="btn btn-info" onClick={() => clickFollow(listMember.handle)}>
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </BaseCard>
        </Paginate>
      ) : (
        <h1>No Content Found</h1>
      )}
    </>
  )
}
