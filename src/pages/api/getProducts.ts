import { getProducts } from './../../database/controllers/productController';
import type { NextApiRequest, NextApiResponse } from 'next'

//GET
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const response = await getProducts()
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}
