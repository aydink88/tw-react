import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from 'state/AppContext'
import { getJwtToken } from 'utils'
import AuthenticatePage from './Authenticate'
import AlertNotifier from './common/AlertNotifier'
//import BookmarksPage from './Bookmarks'
import Spinner from './common/Spinner'
import ErrorPage from './ErrorPage'
//import ExplorePage from './Explore'
//import HashtagTweetsPage from './HashtagTweets'
import AppHeader from './header/AppHeader'
//import HomePage from './Home'
//import ProfilePage from './Profile'
//import { useIsFetching } from 'react-query'

const HomePage = lazy(() => import('./Home'))
const ExplorePage = lazy(() => import('./Explore'))
const BookmarksPage = lazy(() => import('./Bookmarks'))
const ProfilePage = lazy(() => import('./Profile'))
const HashtagTweetsPage = lazy(() => import('./HashtagTweets'))

// function GlobalSpinner() {
//   const isFetching = useIsFetching()

//   return isFetching ? <Spinner fullpage /> : null
// }

function App() {
  const { autoLogin, state } = useAppContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!getJwtToken() && !pathname.startsWith('/auth')) {
      return navigate('/auth', { replace: true })
    }
    if (!state.user?.id && !pathname.startsWith('/auth')) {
      autoLogin().catch(() => {
        navigate('/auth', { replace: true })
      })
    }
    if (getJwtToken() && pathname.startsWith('/auth')) {
      autoLogin().catch(() => {
        navigate('/auth', { replace: true })
      })
    }
    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (state.misc?.appLoading) {
    return <Spinner fullpage />
  }

  if (state.error) {
    return <ErrorPage />
  }

  return (
    <>
      <AppHeader />
      <AlertNotifier />
      <Suspense fallback={<Spinner fullpage />}>
        {/*<GlobalSpinner />*/}
        <div className="flex justify-center p-4 mx-auto w-full min-h-screen text-base-content bg-base-300">
          <div className="w-full xl:w-4/5">
            {state.user?.id ? (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthenticatePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/profile/:handle" element={<ProfilePage />} />
                <Route path="/trend/:id" element={<HashtagTweetsPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/auth" element={<AuthenticatePage />} />
                <Route path="*" element={<Spinner fullpage />} />
              </Routes>
            )}
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default App
