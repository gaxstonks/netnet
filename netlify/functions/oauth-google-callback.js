const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const prisma = require('./lib_prisma');
exports.handler = async function(event){
  const params = event.queryStringParameters || {};
  const code = params.code;
  if(!code) return { statusCode:400, body: 'missing code' }
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID || '', client_secret: process.env.GOOGLE_CLIENT_SECRET || '', redirect_uri: process.env.GOOGLE_REDIRECT || '', grant_type: 'authorization_code' }) });
  const tokenJson = await tokenRes.json(); const idToken = tokenJson.id_token;
  if(!idToken) return { statusCode:400, body: 'no id token' }
  // decode id token (not verified) to extract email/name
  const payload = JSON.parse(Buffer.from(idToken.split('.')[1],'base64').toString());
  const email = payload.email; const name = payload.name;
  // find or create user
  let user = await prisma.user.findUnique({ where:{ email } }); if(!user) user = await prisma.user.create({ data:{ name, email, password: '' } });
  const token = jwt.sign({ userId: user.id, email: user.email, isAdmin: user.isAdmin||false }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '30d' });
  // redirect back to app with token as fragment
  const appUrl = process.env.APP_URL || '/';
  return { statusCode:302, headers:{ Location: `${appUrl}#token=${token}` } }
}
