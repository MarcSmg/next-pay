import { FedaPay } from 'fedapay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
  FedaPay.setEnvironment('sandbox');

  const {firstName, lastName, email} = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({error: 'Please provide your informations'})
  }

  try {
    const transaction = await FedaPay.Transaction.create({
      description: 'Event Registration Fee',
      amount: 500, // The amount is fixed here on the backend
      currency: { iso: 'XOF' },
      customer: {
        firstname: firstName,
        lastname: lastName,
        email: email,
      },
      callback_url: 'localhost:3000/api/payment-callback',
    })
  } catch (error) {
    console.error('FedaPay API Error:', error);
    res.status(500).json({ error: 'Failed to create payment transaction.' });
  }
} 
