import { getFavoriteProducts } from "@/database/controllers/favoriteProductController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { email } = req.query
  
  try {
    const response = await getFavoriteProducts(String(email))
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}