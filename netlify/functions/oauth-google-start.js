exports.handler = async function(){
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const redirect = process.env.GOOGLE_REDIRECT || '';
  const scope = encodeURIComponent('openid email profile');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  return { statusCode:302, headers:{ Location: url } }
}
