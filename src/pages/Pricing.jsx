import React from 'react'
export default function Pricing(){
  async function buy(){
    const res = await fetch('/.netlify/functions/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'test@example.com',priceId:'price_XXXX'})})
    const data = await res.json(); if(data.url) window.location.href=data.url; else alert('Erro')
  }
  return (<main><h1>Planos</h1><p>Exemplo de checkout</p><button onClick={buy} className="mt-4 px-4 py-2 bg-sky-600 text-white rounded">Comprar</button></main>)
}
