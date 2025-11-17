
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').map(c => c.trim()).reduce((acc, cur) => {
    const [k,v] = cur.split('=');
    acc[k] = v;
    return acc;
  }, {});
}

exports.handler = async function(event, context) {
  try {
    const cookies = parseCookies(event.headers && (event.headers.cookie || event.headers.Cookie));
    const token = cookies.session;
    if (!token) return { statusCode: 401, body: JSON.stringify({ error: 'no session' }) };

    const secret = process.env.JWT_SECRET || 'change-me';
    let payload;
    try { payload = jwt.verify(token, secret); } catch(e) { return { statusCode: 401, body: JSON.stringify({ error: 'invalid token' }) }; }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('profiles').select('*').eq('id', payload.id).single();
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
