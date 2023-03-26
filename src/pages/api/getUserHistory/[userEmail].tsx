import { getUser } from "@/database/controllers/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.query.userEmail

  //req.body - pegar parâmetros pelo post
  //req.query - pegar parâmetros pelo get

  try {
    const user = await getUser(String(userEmail))
    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({message: "Não foi possível pegar o usuário"})
  }

} 