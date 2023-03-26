import { useSession } from 'next-auth/react';
import database from "../database"
import { getUser } from './UserController';

//read
export const getFavoriteProducts = async () => {
  const { data: session } = useSession()
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const userEmail = session?.user?.email
  const user = await getUser(String(userEmail))

  return await user.favorites
}

database.disconnect()
