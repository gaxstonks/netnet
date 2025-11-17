import React, {useState} from 'react'
export default function AuthModal({onClose}){
  const [mode,setMode]=useState('login')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  async function signup(){
    const res = await fetch('/.netlify/functions/signup', { method:'POST', body: JSON.stringify({name,email,password}), headers:{'Content-Type':'application/json'} })
    const data = await res.json()
    if(res.ok) alert('Conta criada')
    else alert(data.message||'Erro')
  }
  async function login(){
    const res = await fetch('/.netlify/functions/login', { method:'POST', body: JSON.stringify({email,password}), headers:{'Content-Type':'application/json'} })
    const data = await res.json()
    if(res.ok){ localStorage.setItem('gax_token', data.token); alert('Logado'); onClose()} else alert(data.message||'Erro')
  }
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-lg font-semibold">{mode==='login'?'Entrar':'Criar conta'}</h3>
        {mode==='signup' && (<><label>Nome</label><input value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full"/></>)}
        <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full"/>
        <label>Senha</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full"/>
        <div className="mt-4 flex gap-2">{mode==='login' ? <button onClick={login} className="px-4 py-2 bg-sky-600 text-white rounded">Entrar</button> : <button onClick={signup} className="px-4 py-2 bg-sky-600 text-white rounded">Criar</button>}<button className="text-sm underline" onClick={()=>setMode(mode==='login'?'signup':'login')}>Trocar</button></div>
      </div>
    </div>
  )
}
