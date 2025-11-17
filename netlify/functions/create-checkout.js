const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY||'');
exports.handler = async function(event){
  if(event.httpMethod!=='POST') return { statusCode:405 }
  const body = JSON.parse(event.body||'{}')
  const { email, priceId } = body
  if(!email||!priceId) return { statusCode:400, body: JSON.stringify({ error: 'email and priceId required' }) }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.SUCCESS_URL || 'https://example.com/payment-success',
    cancel_url: process.env.CANCEL_URL || 'https://example.com/pricing',
    metadata: { email, priceId }
  })
  return { statusCode:200, body: JSON.stringify({ url: session.url }) }
}
