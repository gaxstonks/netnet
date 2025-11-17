const jwt = require('jsonwebtoken');
const prisma = require('./lib_prisma');
exports.handler = async function(event){
  const auth = event.headers && (event.headers.authorization || event.headers.Authorization)
  if(!auth) return { statusCode:200, body: JSON.stringify({}) }
  const token = auth.replace(/^Bearer\s+/,'') || ''
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    const user = await prisma.user.findUnique({ where:{ id: decoded.userId } })
    return { statusCode:200, body: JSON.stringify({ user }) }
  }catch(e){ return { statusCode:401, body: JSON.stringify({}) } }
}
