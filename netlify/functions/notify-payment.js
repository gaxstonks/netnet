const prisma = require('./lib_prisma');
exports.handler = async function(event){
  if(event.httpMethod!=='POST') return { statusCode:405 }
  const body = JSON.parse(event.body||'{}')
  const { email, plan, expiresAt } = body
  if(!email||!plan) return { statusCode:400, body: JSON.stringify({message:'email and plan required'}) }
  await prisma.user.updateMany({ where:{ email }, data: { plan, planActiveUntil: expiresAt ? new Date(expiresAt) : null } })
  return { statusCode:200, body: JSON.stringify({ ok: true }) }
}
