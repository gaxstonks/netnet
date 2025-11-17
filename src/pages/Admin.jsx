import React, {useState,useEffect} from 'react'
export default function Admin(){
  const [users,setUsers]=useState([])
  const [secret,setSecret]=useState('')
  useEffect(()=>{ fetch('/.netlify/functions/admin-list').then(r=>r.json()).then(d=>setUsers(d.users||[])) },[])
  async function promote(id){ await fetch('/.netlify/functions/admin-promote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,secret})}); alert('Promovido se secret correto'); }
  return (<main><h1>Admin</h1><p>Use a ADMIN_SECRET para promover usuários a admin.</p><input placeholder="ADMIN_SECRET" value={secret} onChange={e=>setSecret(e.target.value)} className="border p-2"/> <div className="mt-4">{users.map(u=>(<div key={u.id} className="p-2 border my-2"><b>{u.email}</b> - {u.name} <button onClick={()=>promote(u.id)} className="ml-2 px-2 py-1 bg-sky-600 text-white rounded">Promover</button></div>))}</div></main>)
}
