import React, {useEffect, useState} from 'react'
export default function Dashboard(){
  const [user, setUser] = useState(null)
  useEffect(()=>{fetch('/.netlify/functions/me').then(r=>r.json()).then(d=>{ if(d?.user) setUser(d.user) })},[])
  if(!user) return <main className="p-8"><h1>Não autenticado</h1></main>
  return (<main className="p-8"><h1>Dashboard</h1><p>Olá {user.name||user.email}</p></main>)
}
