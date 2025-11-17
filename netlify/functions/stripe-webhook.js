const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY||'');
const prisma = require('./lib_prisma');
exports.handler = async function(event, context){
  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'] || ''
  const buf = Buffer.from(event.body || '', 'utf8')
  try{
    const evt = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET||'')
    if(evt.type === 'checkout.session.completed'){
      const session = evt.data.object
      const email = session.customer_details?.email
      const metadata = session.metadata || {}
      const plan = metadata.plan || 'pro'
      const expiresAt = metadata.expiresAt || null
      if(email) await prisma.user.updateMany({ where:{ email }, data: { plan, planActiveUntil: expiresAt ? new Date(expiresAt) : null } })
    }
    return { statusCode:200, body: JSON.stringify({ received: true }) }
  }catch(e){ return { statusCode:400, body: 'Webhook error: '+String(e.message) } }
}
