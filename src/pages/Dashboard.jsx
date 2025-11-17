import React, {useEffect,useState} from 'react'
export default function Dashboard(){
  const [user,setUser]=useState(null)
  useEffect(()=>{ const t=localStorage.getItem('gax_token'); if(t) fetch('/.netlify/functions/me',{headers:{Authorization:'Bearer '+t}}).then(r=>r.json()).then(d=>setUser(d.user)) },[])
  if(!user) return <main><h1>Não autenticado</h1></main>
  return (<main><h1>Dashboard</h1><p>Olá {user.name||user.email}</p><p>Plano: {user.plan||'free'}</p></main>)
}
