import { getProduct } from "@/database/controllers/productController";
import { NextApiRequest, NextApiResponse } from "next";

//GET
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { query } = req

  try {
    const product = await getProduct(query.productId)
    console.log(req.body)
    res.status(200).json(product)

  } catch (error) {
    res.status(404).json({message: "Produto não encontrado"})
    console.error(error)
  }
}