import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import CapsLock from './components/CapsLock'
import Contador from './components/Contador'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <CapsLock />
    {/* <Contador /> */}
  </React.StrictMode>
)
