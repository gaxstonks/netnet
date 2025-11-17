import React, {useState} from 'react'
const sampleTemplates = [
  { id:'basic', title:'Básico', sections:['Header','Summary','Experience'] },
  { id:'modern', title:'Moderno', sections:['Header','Skills','Projects','Experience'] }
]
export default function Templates(){
  const [tpl,setTpl]=useState(sampleTemplates[0])
  const [fields,setFields]=useState({name:'Seu Nome',title:'Cargo',summary:'Resumo profissional'})
  function onDragStart(e,idx){ e.dataTransfer.setData('idx',idx) }
  function onDrop(e,idx){ const from=+e.dataTransfer.getData('idx'); const arr=[...tpl.sections]; const moved=arr.splice(from,1)[0]; arr.splice(idx,0,moved); setTpl({...tpl,sections:arr}) }
  return (<main>
    <h1>Templates</h1>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <h2>Escolher template</h2>
        {sampleTemplates.map(t=> <button key={t.id} onClick={()=>{setTpl(t);}} className="block my-2">{t.title}</button>)}
        <h3 className="mt-4">Editar campos</h3>
        <input className="border p-2 w-full my-2" value={fields.name} onChange={e=>setFields({...fields,name:e.target.value})} />
        <input className="border p-2 w-full my-2" value={fields.title} onChange={e=>setFields({...fields,title:e.target.value})} />
        <textarea className="border p-2 w-full my-2" value={fields.summary} onChange={e=>setFields({...fields,summary:e.target.value})} />
        <button onClick={()=>{ const data={template:tpl,fields}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='cv-template.json'; a.click(); }} className="px-4 py-2 bg-sky-600 text-white rounded">Exportar JSON</button>
      </div>
      <div>
        <h2>Preview</h2>
        <div className="border p-4">
          <h3>{fields.name} - {fields.title}</h3>
          <p>{fields.summary}</p>
          <div>
            {tpl.sections.map((s,idx)=> (
              <div key={s} draggable onDragStart={e=>onDragStart(e,idx)} onDragOver={e=>e.preventDefault()} onDrop={e=>onDrop(e,idx)} className="p-2 border my-2">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </main>)
}
