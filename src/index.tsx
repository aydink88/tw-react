import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { AppProvider } from 'state/AppContext'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

const AppTree = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<AppTree />)
