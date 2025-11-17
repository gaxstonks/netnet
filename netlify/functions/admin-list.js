const prisma = require('./lib_prisma');
exports.handler = async function(){
  const users = await prisma.user.findMany({ select:{ id:true, email:true, name:true, isAdmin:true } })
  return { statusCode:200, body: JSON.stringify({ users }) }
}
