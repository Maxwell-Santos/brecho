import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export function Dashboard() {
  const { data: session } = useSession()

  const logoutUser = async () => {
    const decision = confirm("Tem certeza que deseja sair?")

    if (decision) await signOut()
    else return
  }

  const [openMoreInfo, setOpenMoreInfo] = useState(false)

  return (
    <div className="p-4 px-6 shadow-md cursor-pointer z-50 bg-white" onClick={() => setOpenMoreInfo(!openMoreInfo)} >

      <div className="flex items-center justify-end gap-4">
        <div className="text-right">
          <h1>Bem vindo, {session?.user?.name}</h1>
          <span className="text-sm text-gray-800">{session?.user?.email}</span>
        </div>
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <img src={session?.user?.image || '/google.svg'} alt="foto de perfil do usuário" />
        </div>

      <span>
        {
          openMoreInfo && (
            <div className="flex flex-col">
              <button
                onClick={() => logoutUser()}
                className="bg-red-600 hover:bg-red-700 transition-all px-2 text-white"
              >
                Sair
              </button>
            </div>
          )
        }
      </span>

        </div>
    </div>
  )
}
