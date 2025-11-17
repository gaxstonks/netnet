import React, {useState} from 'react'
import AuthModal from '../ui/AuthModal'
export default function Home(){
  const [show,setShow]=useState(false)
  return (<main>
    <h1 className="text-3xl font-bold">GAX Currículos</h1>
    <p>Crie currículos profissionais</p>
    <div className="mt-4"><button onClick={()=>setShow(true)} className="px-4 py-2 bg-sky-600 text-white rounded">Entrar / Criar</button></div>
    {show && <AuthModal onClose={()=>setShow(false)} />}
  </main>)
}
