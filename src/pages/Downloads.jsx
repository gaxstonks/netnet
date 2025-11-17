import React, {useEffect, useState} from 'react'
export default function Downloads(){
  const [ok, setOk] = useState(false)
  useEffect(()=>{fetch('/.netlify/functions/me').then(r=>r.json()).then(d=>{ if(d?.user && d.user.planActiveUntil && new Date(d.user.planActiveUntil) > new Date()) setOk(true) })},[])
  return (<main className="p-8"><h1>Downloads</h1>{ok ? <a href="/downloads-sample-cv.pdf" className="underline">Currículo Modelo</a> : <p>Plano não ativo</p>}</main>)
}
