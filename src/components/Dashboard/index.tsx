import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"

export function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const logoutUser = async () => {
    const decision = confirm("Tem certeza que deseja sair?")

    if (decision) {
      await signOut()
    }

    else return
  }

  useMemo(() => {
    if (status == 'unauthenticated') router.push("/login")

  }, [session])

  const [openMoreInfo, setOpenMoreInfo] = useState(false)

  return (
    <header id="dashboard" className="p-2 px-6 cursor-pointer z-50 text-white">

      <div className="flex items-center gap-4 relative">
        <nav className="space-x-8 w-fit self-center">
          <Link href={"/products"}>Produtos</Link>
          <Link href={"/form-product"}>Formulário</Link>
        </nav>

        <div className="flex items-center ml-auto">
          <div
            className="text-right mr-3"
            onClick={() => setOpenMoreInfo(!openMoreInfo)}
          >
            <h1 className="hover:text-title transition-all">Bem vindo, {session?.user?.name}</h1>
            {/* <span className="text-sm text-gray-800">{session?.user?.email}</span> */}
          </div>
          <div className="relative w-14 h-14 rounded-full overflow-hidden">
            {
              session?.user ? (
                <img
                  src={session?.user?.image || 'https://picsum.photos/id/237/200/300'}
                  alt="foto de perfil do usuário"
                />
                ) : (
                <img
                  src={'https://picsum.photos/id/237/200/300'}
                  alt="foto de perfil do usuário"
                />

              )
            }

          </div>

          <span>
            {
              openMoreInfo && (
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      logoutUser()
                    }}
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
    </header>
  )
}
