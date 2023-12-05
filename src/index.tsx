import { Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { AlertContextProvider } from './contexts/AlertContext'
import globalStyles from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <AlertContextProvider>
      <>
        <Global styles={globalStyles} />
        <App />
      </>
    </AlertContextProvider>
  </QueryClientProvider>,
)
