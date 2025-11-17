import React from 'react'
export default function Navbar({nav}){
  return (
    <nav className="p-4 bg-sky-600 text-white flex gap-4">
      <button onClick={()=>nav('/')} className="font-bold">GAX Currículos</button>
      <button onClick={()=>nav('/pricing')}>Planos</button>
      <button onClick={()=>nav('/templates')}>Templates</button>
      <button onClick={()=>nav('/dashboard')}>Dashboard</button>
      <button onClick={()=>nav('/downloads')}>Downloads</button>
      <button onClick={()=>nav('/admin')}>Admin</button>
    </nav>
  )
}
