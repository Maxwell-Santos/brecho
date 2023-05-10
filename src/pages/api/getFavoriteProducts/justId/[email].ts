import { getFavoriteProductsIds } from '@/database/controllers/favoriteProductController'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {email} = req.query
  
  try {
    const favoritesIds = await getFavoriteProductsIds(String(email))
    
    res.status(200).json(favoritesIds)

  } catch (error) {
    console.error(error)
    res.status(500).json({message: "não foi possível pegar os IDs dos produtos"})
  }
}