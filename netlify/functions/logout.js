
exports.handler = async function(event, context) {
  const site = process.env.SITE_URL || 'https://pluscurriculo.netlify.app';
  const cookie = `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  return { statusCode: 302, headers: { 'Set-Cookie': cookie, 'Location': site } };
};
