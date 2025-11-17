import React, { useState } from 'react'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Downloads from './pages/Downloads'
import Navbar from './components/Navbar'

export default function App(){
  const [route, setRoute] = useState(window.location.pathname || '/')
  window.onpopstate = () => setRoute(window.location.pathname)
  const nav = (path)=>{ history.pushState(null,'',path); setRoute(path) }
  return (
    <div>
      <Navbar nav={nav} />
      {route === '/' && <Home nav={nav} />}
      {route === '/pricing' && <Pricing nav={nav} />}
      {route === '/dashboard' && <Dashboard nav={nav} />}
      {route === '/downloads' && <Downloads nav={nav} />}
    </div>
  )
}
