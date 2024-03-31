import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse the incoming event
    const sessionId = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId.sessionID);
      
      res.status(200).json(session)
    } catch (error) {
      console.error('Error handling webhook event:', error);
      res.status(500).end();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
