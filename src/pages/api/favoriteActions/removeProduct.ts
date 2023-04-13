import { deleteFavoriteProduct } from '@/database/controllers/favoriteProductController'
import type { NextApiRequest, NextApiResponse } from 'next'

// Adicionar novo produto para a lista de produtos

//DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { email, productId } = req.body

  try {
    const productToDelete = await deleteFavoriteProduct(email, productId)
    res.status(200).json({message: "success", productToDelete})

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}