
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

exports.handler = async function(event, context) {
  const params = event.queryStringParameters || {};
  const code = params.code;
  if (!code) return { statusCode: 400, body: 'Missing code' };

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const site = process.env.SITE_URL || 'https://pluscurriculo.netlify.app';
  const redirect = `${site}/.netlify/functions/oauth-callback`;

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect,
      grant_type: 'authorization_code'
    })
  });
  const tokenJson = await tokenRes.json();
  if (tokenJson.error) return { statusCode: 500, body: JSON.stringify(tokenJson) };

  // Get user info
  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` }
  });
  const user = await userRes.json();

  // Upsert to Supabase
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    await supabase.from('profiles').upsert({
      id: user.sub,
      email: user.email,
      full_name: user.name,
      avatar_url: user.picture
    }, { onConflict: 'id' });
  } catch (e) {
    console.error(e);
  }

  // Sign JWT and set cookie
  const secret = process.env.JWT_SECRET || 'change-me';
  const token = jwt.sign({ id: user.sub, email: user.email }, secret, { expiresIn: '7d' });

  // Set cookie and redirect to site root
  const cookie = `session=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax; Secure`;
  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': cookie,
      'Location': site
    }
  };
};
