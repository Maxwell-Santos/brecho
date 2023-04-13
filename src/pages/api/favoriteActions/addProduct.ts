import { setNewFavoriteProduct } from '@/database/controllers/favoriteProductController';
import type { NextApiRequest, NextApiResponse } from 'next'

// Adicionar novo produto para a lista de produtos

//POST
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { email, product } = req.body

  try {
    setNewFavoriteProduct(email, product)

    res.status(200).json({message: "success"})

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}