import { getFavoriteProducts } from "@/database/controllers/favoriteProductController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  
  try {
    const response = await getFavoriteProducts()
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}