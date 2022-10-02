import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoverProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoverProvider>
      <App />
    </RoverProvider>
  </React.StrictMode>
)
