
exports.handler = async function(event, context) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const site = process.env.SITE_URL || 'https://pluscurriculo.netlify.app';
  const redirect = `${site}/.netlify/functions/oauth-callback`;
  const scope = encodeURIComponent('openid email profile');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&scope=${scope}&access_type=offline&prompt=consent`;
  return { statusCode: 302, headers: { Location: url } };
};
