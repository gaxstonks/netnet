import React, { useState } from 'react'
import AuthModal from '../ui/AuthModal'
export default function Home(){
  const [show, setShow] = useState(false)
  return (
    <main className="p-12">
      <h1 className="text-3xl font-bold mb-4">GAX Currículos</h1>
      <p>Crie currículos profissionais em minutos.</p>
      <div className="mt-4">
        <button onClick={()=>setShow(true)} className="px-4 py-2 bg-sky-600 text-white rounded">Entrar / Registrar</button>
      </div>
      {show && <AuthModal onClose={()=>setShow(false)} />}
    </main>
  )
}
