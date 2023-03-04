import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()
  console.log(session)

  return (
    <div className=" mx-auto h-screen grid place-items-center">
      {
        status == 'authenticated' ? (
          <div className="">
            <h1>Bem vindo, {session.user?.email}</h1>
            <button onClick={() => signOut()}>Sair</button>
          </div>
        ) : (
          <div className="">
            <h1>Login</h1>
            <button onClick={() => signIn()} className="bg-green-300 ">Login</button>
          </div>
        )
      }
    </div>
  )
}