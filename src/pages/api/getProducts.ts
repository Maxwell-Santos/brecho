import { getProducts } from './../../database/controllers/ProductController';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  const method = req.method
  
  switch (method) {
    case 'GET':
      const response = await getProducts()
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
