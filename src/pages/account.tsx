import { useSession, signOut, getSession } from "next-auth/react"

export default function Account() {
  const { data: session, status } = useSession()
  
  return (
    <div className=" mx-auto h-screen grid place-items-center">
      {
        status == 'authenticated' && (
          <div className="">
            <h1>Bem vindo, {session.user?.email}</h1>
            <button onClick={() => signOut()}>Sair</button>
          </div>
        )
      }
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: "/login"
      }
    }
  }

  return {
    props: {session},
  }
}