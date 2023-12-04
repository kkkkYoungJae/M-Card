import { Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { AlertContextProvider } from './contexts/AlertContext'
import './index.css'
import reportWebVitals from './reportWebVitals'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
