import { setNewBuy } from './../../database/controllers/UserController';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>){
  const method = req.method
  const {user, cart} = req.body

  switch (method) {
    case 'POST':
      const response = await setNewBuy(user, cart)
        .then(data => {
          console.log(data)
          res.status(200).json(data)
        })
        .catch(err => console.error(err))
      break;

    default:
      break;
  }

}
