import { setNewUser } from './../../database/controllers/UserController';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const method = req.method

  switch (method) {
    case 'POST':
      if (req.body.email.length <= 0) {
        const response = await setNewUser(req.body) //email, cart
          .then(data => {
            res.status(200).json(data)
          })
          .catch(err => console.error(err))
          
        } else res.status(400).json({message: "Email do usuário não encontrado"})
      break;

    default:
      break;
  }

}
