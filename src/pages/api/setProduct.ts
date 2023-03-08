import { setNewProduct } from './../../database/controllers/productController';
import type { NextApiRequest, NextApiResponse } from 'next'

//POST
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const productData = req.body

  
  try {
    console.log(productData)

    const setProduct = await setNewProduct(productData)
    res.status(200).json({message: "success"})

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}