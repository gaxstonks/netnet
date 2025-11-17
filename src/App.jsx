import React, {useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Downloads from './pages/Downloads'
import Admin from './pages/Admin'
import Templates from './pages/Templates'

export default function App(){
  const [route,setRoute]=useState(window.location.pathname||'/')
  useEffect(()=>{window.onpopstate=()=>setRoute(window.location.pathname)},[])
  const nav=(p)=>{history.pushState(null,'',p); setRoute(p)}
  return (
    <div>
      <Navbar nav={nav} />
      <div className="container p-6">
        {route==='/' && <Home nav={nav} />}
        {route==='/pricing' && <Pricing nav={nav} />}
        {route==='/dashboard' && <Dashboard nav={nav} />}
        {route==='/downloads' && <Downloads nav={nav} />}
        {route==='/admin' && <Admin nav={nav} />}
        {route==='/templates' && <Templates nav={nav} />}
      </div>
    </div>
  )
}
