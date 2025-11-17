import React, {useEffect,useState} from 'react'
export default function Downloads(){
  const [ok,setOk]=useState(false)
  useEffect(()=>{ const t=localStorage.getItem('gax_token'); if(t) fetch('/.netlify/functions/me',{headers:{Authorization:'Bearer '+t}}).then(r=>r.json()).then(d=>{ if(d.user && d.user.planActiveUntil && new Date(d.user.planActiveUntil) > new Date()) setOk(true) }) },[])
  return (<main><h1>Downloads</h1>{ok ? <a href="/downloads-sample-cv.pdf" className="underline">Currículo Modelo</a> : <p>Plano não ativo</p>}</main>)
}
