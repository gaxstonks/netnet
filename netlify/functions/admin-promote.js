const prisma = require('./lib_prisma');
exports.handler = async function(event){
  if(event.httpMethod!=='POST') return { statusCode:405 }
  const body = JSON.parse(event.body||'{}')
  const { id, secret } = body
  if(secret !== process.env.ADMIN_SECRET) return { statusCode:401, body: JSON.stringify({ message:'invalid secret' }) }
  await prisma.user.update({ where:{ id }, data:{ isAdmin:true } })
  return { statusCode:200, body: JSON.stringify({ ok:true }) }
}
