const bcrypt = require('bcrypt');
const prisma = require('./lib_prisma');
exports.handler = async function(event){
  if(event.httpMethod!=='POST') return { statusCode:405 }
  const body = JSON.parse(event.body||'{}')
  const { name, email, password } = body
  if(!email||!password) return { statusCode:400, body: JSON.stringify({message:'email and password required'}) }
  const exists = await prisma.user.findUnique({ where:{ email } })
  if(exists) return { statusCode:409, body: JSON.stringify({message:'User exists'}) }
  const hashed = await bcrypt.hash(password,10)
  const user = await prisma.user.create({ data:{ name, email, password: hashed, plan: 'free' } })
  return { statusCode:200, body: JSON.stringify({ ok: true, id: user.id }) }
}
