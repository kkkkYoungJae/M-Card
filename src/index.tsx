import { Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import AuthGuard from './components/auth/AuthGuard'
import { AlertContextProvider } from './contexts/AlertContext'
import globalStyles from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <Global styles={globalStyles} />
    <AlertContextProvider>
      <AuthGuard>
        <App />
      </AuthGuard>
    </AlertContextProvider>
  </QueryClientProvider>,
)
