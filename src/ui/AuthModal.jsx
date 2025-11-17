import React, {useState} from 'react'
export default function AuthModal({onClose}){
  const [mode,setMode]=useState('login')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  async function signup(){ const res = await fetch('/.netlify/functions/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})}); const d=await res.json(); if(res.ok) alert('Conta criada') else alert(d.message||'Erro') }
  async function login(){ const res = await fetch('/.netlify/functions/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const d=await res.json(); if(res.ok){ localStorage.setItem('gax_token', d.token); alert('Logado'); onClose() } else alert(d.message||'Erro') }
  async function google(){ window.location.href = '/.netlify/functions/oauth-google-start' }
  return (<div className="fixed inset-0 grid place-items-center bg-black/40 z-50"><div className="bg-white p-6 rounded-md w-96"><h3>{mode==='login'?'Entrar':'Criar conta'}</h3>{mode==='signup' && (<><label>Nome</label><input className="border p-2 w-full" value={name} onChange={e=>setName(e.target.value)}/></>)}<label>Email</label><input className="border p-2 w-full" value={email} onChange={e=>setEmail(e.target.value)}/><label>Senha</label><input type="password" className="border p-2 w-full" value={password} onChange={e=>setPassword(e.target.value)}/><div className="mt-4 flex gap-2"><button onClick={mode==='login'?login:signup} className="px-4 py-2 bg-sky-600 text-white rounded">{mode==='login'?'Entrar':'Criar'}</button><button onClick={()=>setMode(mode==='login'?'signup':'login')} className="text-sm underline">Trocar</button><button onClick={google} className="ml-auto text-sm underline">Entrar com Google</button></div></div></div>)
}
