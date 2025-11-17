const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./lib_prisma');
exports.handler = async function(event, context){
  if(event.httpMethod!=='POST') return { statusCode:405 }
  const body = JSON.parse(event.body||'{}')
  const { email, password } = body
  if(!email||!password) return { statusCode:400, body: JSON.stringify({message:'email and password required'}) }
  const user = await prisma.user.findUnique({ where:{ email } })
  if(!user) return { statusCode:401, body: JSON.stringify({message:'Invalid'}) }
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return { statusCode:401, body: JSON.stringify({message:'Invalid'}) }
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '30d' })
  return { statusCode:200, body: JSON.stringify({ token }) }
}
